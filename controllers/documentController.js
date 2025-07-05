const asyncHandler = require('express-async-handler');
const Document = require('../models/documents');
const DocumentVersion = require('../models/versions');
const getUserById = require('../utils/getUserById');

// Create a new document and its first version
const createDocument = asyncHandler(async (req, res) => {
    const { name, content } = req.body;

    // Validate input
    if (!name || !content) {
        res.status(400);
        throw new Error('Name and Content fields are required');
    }

    // Get the user
    const user = await getUserById(req.user._id);

    // Create the Document
    const document = await Document.create({
        name,
        author: user.name,
    });

    // Create the first version
    const version = await DocumentVersion.create({
        documentId: document._id,
        content,
        createdBy: req.user._id,
    });

    // Send response
    res.status(201).json({
        message: 'Document created successfully',
        documentId: document._id,
        versionId: version._id,
    });
});

const getDocument = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const document  = await Document.findById(id);
    if (!document || document.deleted) {
        res.status(404);
        throw new Error('Document not found');
    }
    // Get the latest version
    const latestVersion = await DocumentVersion.findOne({ documentId: id, version: document.currentVersion });
    if(!latestVersion) {
        res.status(404);
        throw new Error('Latest version not found');
    }

    res.status(200).json({
        _id: document._id,
        name: document.name,
        author: document.author,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        currentVersion: document.currentVersion,
        latestVersion: {
            _id: latestVersion._id,
            content: latestVersion.content,
            createdBy: latestVersion.createdBy,
            createdAt: latestVersion.createdAt
        }
    })
})

const deleteDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the document
    const document = await Document.findById(id);
    if (!document || document.deleted) {
        res.status(404);
        throw new Error('Document not found');
    }
    // Mark the document as deleted
    document.deleted = true;
    await document.save();

    res.status(200).json({
        message: 'Document deleted successfully',
        documentId: id
    });
});

// const updateDocument = asyncHandler(async(req,res)=>{
//     const {id} = req.params;
//     const {content} = req.body;
//     let retry = 3;

//     while(retry > 0){
//         try{

//     const document = await Document.findById(id);
//     if (!document || document.deleted) {
//         res.status(404);
//         throw new Error('Document not found');
//     }
//     const documentVersion = await DocumentVersion.findOne({ documentId: id, version: document.currentVersion });

//     if (!documentVersion || documentVersion.content === content) {
//         res.status(404);
//         throw new Error('Document version not found or content is the same as the latest version');
//     }

//     document.currentVersion += 1;
//     document.updatedAt = Date.now();
//     await document.save();
//     // handle concurrency here

//     const expextedVersion = document.currentVersion;

//     const latestDocument = await Document.findById(id);
//     if (!latestDocument || latestDocument.currentVersion !== expextedVersion) {
//         throw new Error('Document version mismatch, retrying...');
//     }
    
//     const newVersion = await DocumentVersion.create({
//         documentId: document._id,
//         content,
//         version: document.currentVersion,
//         createdBy: req.user._id
//     });

//     res.status(200).json({
//         message: 'Document updated successfully',
//         documentId: document._id,
//         versionId: newVersion._id,
//     });
// }
// catch (error) {
//             retry -= 1;
//             if (retry === 0) {
//                 res.status(500);
//                 throw new Error('Failed to update document after multiple attempts');
//             }
//         }
// }

// })

const updateDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    let retryCount = 5;

    while (retryCount > 0) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const document = await Document.findById(id).session(session);

            if (!document || document.deleted) {
                await session.abortTransaction();
                session.endSession();
                res.status(404);
                throw new Error('Document not found');
            }

            const documentVersion = await DocumentVersion.findOne({
                documentId: id,
                version: document.currentVersion
            }).session(session);

            if (!documentVersion || documentVersion.content === content) {
                await session.abortTransaction();
                session.endSession();
                res.status(404);
                throw new Error('Document version not found or content is the same as the latest version');
            }

            // Atomic update with optimistic locking
            const updatedDocument = await Document.findOneAndUpdate(
                {
                    _id: id,
                    currentVersion: document.currentVersion,
                    deleted: false
                },
                {
                    $inc: { currentVersion: 1 },
                    updatedAt: Date.now()
                },
                {
                    new: true,
                    session
                }
            );

            if (!updatedDocument) {
                throw new Error('Concurrent update detected');
            }

            const newVersion = await DocumentVersion.create([{
                documentId: document._id,
                content,
                version: updatedDocument.currentVersion,
                createdBy: req.user._id
            }], { session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                message: 'Document updated successfully',
                documentId: document._id,
                versionId: newVersion[0]._id,
            });

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            retryCount--;
            if (retryCount > 0) {
                await new Promise(resolve => setTimeout(resolve, 50)); // wait 50ms before retry
              }

            if (retryCount === 0) {
                res.status(500);
                throw new Error(`Failed to update document after ${3 - retryCount} attempts: ${error.message}`);
            }

        }
    }
});




module.exports = {
    createDocument,
    getDocument,
    deleteDocument,
    updateDocument
};

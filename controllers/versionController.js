const asyncHandler = require('express-async-handler');
const Document = require('../models/documents');
const DocumentVersion = require('../models/versions');
const getUserById = require('../utils/getUserById');
const performDiff = require('../utils/diffAlgorithm');

const getVersion = asyncHandler(async (req, res) => {

    const { id, versionId } = req.params;

    const version = await DocumentVersion.findOne({ documentId: id, version: versionId });
    if (!version) {
        res.status(404);
        throw new Error('Version not found');
    }

    res.status(200).json({
        _id: version._id,
        documentId: version.documentId,
        content: version.content,
        createdBy: version.createdBy,
        createdAt: version.createdAt,
        updatedAt: version.updatedAt
    });
})

const getAllVersions = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const versions = await DocumentVersion.find({ documentId: id }).sort({ createdAt: -1 });
    if (!versions || versions.length === 0) {
        res.status(404);
        throw new Error('No versions found for this document');
    }

    const totalVersions = versions.length;
    const totalPages = Math.ceil(totalVersions / limit);
    if (page > totalPages) {
        res.status(404);
        throw new Error('Page not found');
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedVersions = versions.slice(startIndex, endIndex);

    res.status(200).json({
        page: page,
        totalPages: totalPages,
        total: totalVersions,
        versions: paginatedVersions.map(version => ({
            _id: version._id,
            documentId: version.documentId,
            content: version.content,
            createdBy: version.createdBy,
            createdAt: version.createdAt,
            updatedAt: version.updatedAt
        }))
    });

});

const rollbackVersion = asyncHandler(async(req, res)=>{
    const { id, versionId } = req.params;

    const documentVersion = await DocumentVersion.findOne({ documentId: id, version: versionId });

    if (!documentVersion) {
        res.status(404);
        throw new Error('Version not found');
    }

    const document = await Document.findById(id);
    if (!document || document.deleted) {
        res.status(404);
        throw new Error('Document not found');
    }

    document.currentVersion += 1;
    document.updatedAt = Date.now();
    await document.save();

    const newVersion = await DocumentVersion.create({
        documentId: document._id,
        content: documentVersion.content,
        version: document.currentVersion,
        createdBy: req.user._id
    });

    res.status(200).json({
        message: 'Document updated successfully',
        documentId: document._id,
        versionId: newVersion._id,
    });

});

const getDiffById = asyncHandler(async(req,res)=>{
    const {id, version1, version2} = req.params;

    const versionOne = await DocumentVersion.findOne({ documentId: id, version: version1 });
    const versionTwo = await DocumentVersion.findOne({ documentId: id, version: version2 });

    if (!versionOne || !versionTwo) {
        res.status(404);
        throw new Error('One or both versions not found');
    }
    const diff = performDiff(versionOne.content, versionTwo.content);

    res.status(200).json({
        version1: {
            _id: versionOne._id,
            content: versionOne.content,
            createdBy: versionOne.createdBy,
            createdAt: versionOne.createdAt
        },
        version2: {
            _id: versionTwo._id,
            content: versionTwo.content,
            createdBy: versionTwo.createdBy,
            createdAt: versionTwo.createdAt
        },
        diff: diff 
    })
});

const getLatestDiff = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    const versions = await DocumentVersion.find({ documentId: id }).sort({ version: -1 }).limit(2);
    if (versions.length < 2) {
        res.status(404);
        throw new Error('Not enough versions to compare');
    }

    const diff = performDiff(versions[1].content, versions[0].content);

    res.status(200).json({
        version1: {
            _id: versions[0]._id,
            content: versions[0].content,
            createdBy: versions[0].createdBy,
            createdAt: versions[0].createdAt
        },
        version2: {
            _id: versions[1]._id,
            content: versions[1].content,
            createdBy: versions[1].createdBy,
            createdAt: versions[1].createdAt
        },
        diff: diff 
    });
});

module.exports = {
    getVersion,
    getAllVersions,
    rollbackVersion,
    getDiffById,
    getLatestDiff
}
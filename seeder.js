const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Document = require('./models/documents.js');
const DocumentVersion = require('./models/versions.js');
const connectDB = require('./config/db.js');
const dummyDocuments = require('./data/documents.js');
const dummyVersions = require('./data/documentVersion.js');

dotenv.config();

connectDB();

const getDocumentIndex = (index) => {
    if (index<3){
        return 0;
    }
    else if (index>2 && index<7){
        return 1;
    }
    else if (index>6 && index<9){
        return 2;
    }
    else{
        return 3;
    }
}

const seedData = async()=>{
    try{
        const insertedDocs = await Document.insertMany(dummyDocuments);

        const versionsWithDocIds = dummyVersions.map((version, index) => {
            // Map by array position or create your own mapping logic
            const docIndex = getDocumentIndex(index); // You need to implement this
            return {
                ...version,
                documentId: insertedDocs[docIndex]._id
            };
        });

        await DocumentVersion.insertMany(versionsWithDocIds);
        console.log('Data seeded successfully');
        process.exit(0);
    }
    catch(error){
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
}

const destroyData = async()=>{
    try{
        await Document.deleteMany();
        await DocumentVersion.deleteMany();
        console.log('Data destroyed successfully');
        process.exit(0);
    }
    catch(error){
        console.error(`Error destroying data: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else if (process.argv[2] === '-i') {
    seedData()
  }
const mongoose = require('mongoose');

const documentVersionSchema = new mongoose.Schema({
    documentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    version:{
        type:Number,
        required:true
    },
    content: {
        type: Object,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DocumentVersion = mongoose.model('DocumentVersion', documentVersionSchema);

module.exports = DocumentVersion;
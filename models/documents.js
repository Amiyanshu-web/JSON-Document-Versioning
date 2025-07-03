const mongoose = require('mongoose');

const documentSchema= new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    currentVersion: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    _id: String,
    data: Object,       // stores Quill's Delta format
    createdBy: String,  // optional
});

module.exports = mongoose.model("Document", DocumentSchema);
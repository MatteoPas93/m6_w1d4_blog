const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    from: String,
    to: String,
    subject: String,
    text: String
}, {timestamps: true});

module.exports = mongoose.model('emailModel', EmailSchema, 'email');
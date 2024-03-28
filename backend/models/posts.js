const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    readTime: {
        type: Number,
        required: false
    },
    author: {
         name: {
            type: String,
            required: true,
         },
         avatar: {
            type: String,
            required: false,
         },
    },
    content: {
        type: String,
        required: false,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentModel',
        default: []
    }]
}, {timestamps: true, strict: true});

module.exports = mongoose.model('postModel', PostSchema, 'posts')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 250,
    },
    surname: {
        type: String,
        required: true,
        max: 250,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type:String,
    },
    birthday: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        max: 250
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('userModel', UserSchema, 'authors')
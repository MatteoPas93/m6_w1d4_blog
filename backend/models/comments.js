const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {timestamps: true, strict: true});

module.exports = mongoose.model('commentModel', CommentSchema, 'comment')

const express = require('express');
const routerComments = express.Router();
const commentController = require('../controller/commentsController');

routerComments.get('/blogPosts/:id/comments', commentController.getComments);

routerComments.get('/blogPosts/:id/comments/:commentId', commentController.getComment);

routerComments.post('/blogPosts/:id', commentController.postComment);

routerComments.patch('/blogPosts/:id/comments/:commentId', commentController.patchComment);

routerComments.delete('/blogPosts/:id/deleteComment/:commentId', commentController.deleteComment);

module.exports = routerComments;
const express = require('express');
const routerComments = express.Router();
const commentController = require('../controller/commentsController');

routerComments.get('/blogPosts/:id/getComments', commentController.getComments);

routerComments.get('/blogPosts/:id/getComments/comment:id', commentController.getComment);

routerComments.post('/blogPosts/:id', commentController.postComment);

routerComments.patch('/blogPosts/:id/patchComments/comment:id', commentController.patchComment);

routerComments.delete('/blogPosts/:id/deleteComment/comment:id', commentController.deleteComment);

module.exports = routerComments;
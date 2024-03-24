const express = require("express");
const routerPosts = express.Router();
const logger = require('../middlewares/logger');
const postController = require('../controller/postsController');
const updatePostCoverController = require('../controller/updatePostCoverController');

routerPosts.get("/getPosts", logger, postController.getPosts );

routerPosts.get("/getPost/:id", postController.getPost);

routerPosts.post("/createPost", postController.addPost);

routerPosts.patch("/updatePost/:id", postController.patchPost );

routerPosts.delete("/deletePost/:id", postController.deletePost);

routerPosts.patch('/posts/:id/cover', updatePostCoverController.patchPostCover);

module.exports = routerPosts;

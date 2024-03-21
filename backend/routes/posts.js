const express = require("express");
const routerPosts = express.Router();
const logger = require('../middlewares/logger');
const postController = require('../controller/postsController');

routerPosts.get("/getPosts", logger, postController.getPosts );

routerPosts.get("/getPost/:id", postController.getPost);

routerPosts.post("/createPost", postController.addPost);

routerPosts.patch("/updatePost/:id", postController.patchPost );

routerPosts.delete("/deletePost/:id", postController.deletePost);

module.exports = routerPosts;

const postModel = require('../models/posts');

exports.getPosts =  async (request, response) => {
    const { page = 1, pageSize = 20 } = request.query;
    try {
      const posts = await postModel
        .find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .sort({ author: 1 });
  
        const totalPosts = await postModel.countDocuments();
  
      response.status(200).send({
          currentPage: page,
          pageSize,
          totalPages: Math.ceil(totalPosts / pageSize),
          totalPosts: (totalPosts),
          posts
      });
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

exports.getPost =  async (request, response) => {
    const { id } = request.params;
    try {
      const post = await postModel.findById(id);
  
      if (!post) {
        return response.status(404).send({
          statusCode: 404,
          message: "The requested post does not exist",
        });
      }
      response.status(200).send(post);
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

exports.addPost = async (request, response) => {
    const newPost = new postModel({
      category: request.body.category,
      title: request.body.title,
      cover: request.body.cover,
      readTime: request.body.readTime,
      author: request.body.author,
      content: request.body.content,
    });
  
    try {
      const postToSave = await newPost.save();
      response.status(201).send({
        statusCode: 201,
        payload: postToSave,
      });
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

exports.patchPost = async (request, response) => {
    const { id } = request.params;
  
    try {
      const post = await postModel.findById(id);
  
      if (!post) {
        return response.status(404).send({
          statusCode: 404,
          message: "The requested post does not exist",
        });
      }
  
      const updateData = request.body;
      const options = { new: true };
  
      const results = await postModel.findByIdAndUpdate(id, updateData, options);
      response.status(200).send(results);
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

exports.deletePost = async (request, response) => {
    const { id } = request.params;
  
    try {
      const post = await postModel.findByIdAndDelete(id);
  
      if (!post) {
        return response.status(404).send({
          statusCode: 404,
          message: "The requested post does not exist",
        });
      }
      response.status(200).send("The post has been removed");
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
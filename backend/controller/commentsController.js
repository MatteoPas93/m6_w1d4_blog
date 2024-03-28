const commentModel = require("../models/comments");
const postModel = require("../models/posts");

exports.getComments = async (request, response) => {
  const {id} = request.params
  try {
    const post = await postModel.findById(id);
    const comments = await commentModel.find(post.comments);

    if(!comments) {
      return response.status(404).send({
        statusCode: 404,
        message: 'Comments not found!'
      })
    }

    response.status(200).send(
      comments,
    );
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getComment = async (request, response) => {
  const {id, commentId} = request.params;
  try {
    const post = await postModel.findById(id)

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found!",
      });
    }
    const comment = await commentModel.findById(commentId)

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment not found!",
      });
    }
    response.status(200).send(comment);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.postComment = async (request, response) => {
  const { id } = request.params;

  const newComment = new commentModel({
    user: request.body.user,
    comment: request.body.comment,
    date: request.body.date,
  });
  try {
    const commentToSave = await newComment.save();
    response.status(201).send({
      statusCode: 201,
      payload: commentToSave,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.patchComment = async (request, response) => {
  const { id } = request.params;

  try {
    const comment = await commentModel.findById(id);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment does not exist!",
      });
    }

    const updateComment = request.body;
    const options = { new: true };

    const results = await commentModel.findByIdAndUpdate(
      id,
      updateComment,
      options
    );

    response.status(200).send(results);
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.deleteComment = async (request, response) => {
  const { id } = request.params;
  try {
    const comment = await commentModel.findByIdAndDelete(id);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment does not exist",
      });
    }
    response.status(200).send("Comment has been removed");
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const commentModel = require("../models/comments");
const postModel = require("../models/posts");

exports.getComments = async (request, response) => {
  const {id} = request.params
  const {page = 1, pageSize = 3} = request.query;
  try {
    const post = await postModel.findById(id);

    if(!post) {
      return response.status(404).send({
        statusCode: 404,
        message: 'Post not found!'
      })
    }

    const comments = await commentModel.find({_id: {$in: post.comments}})
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort({comment: 1})

    if(!comments) {
      return response.status(404).send({
        statusCode: 404,
        message: 'Comments not found!'
      })
    }

    const totalComments = await commentModel.countDocuments()

    response.status(200).send({
      currentPage: page,
      pageSize,
      totalePages: Math.ceil(totalComments / pageSize),
      totalComments: (totalComments),
      comments,
    });
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

  const post = await postModel.findById(id)

  if (!post) {
    return response.status(404).send({
      statusCode: 404,
      message: 'Post not found'
    });
  }

  const newComment = new commentModel({
    user: request.body.user,
    comment: request.body.comment,
    date: Date.now(),
  });
  try {
    const commentToSave = await newComment.save();

    await postModel.findByIdAndUpdate(id, {$push: {comments: commentToSave._id}})

    response.status(201).send({
      statusCode: 201,
      payload: commentToSave,
      message: 'Comment successfully posted'
    });
  } catch (error) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

exports.patchComment = async (request, response) => {
  const { id, commentId } = request.params;

  try {
    const post = await postModel.findById(id);

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found!",
      });
    }
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment not found!",
      });
    }

    const updateComment = request.body;
    const options = { new: true };

    const results = await commentModel.findByIdAndUpdate(
      commentId,
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
  const { id, commentId } = request.params;
  try {
    const post = await postModel.findOneAndUpdate(
      {_id: id},
      {$pull: {comments: commentId}},
      {new: true}
    )

    if (!post) {
      return response.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    const comment = await commentModel.findByIdAndDelete(commentId);

    if (!comment) {
      return response.status(404).send({
        statusCode: 404,
        message: "Comment not found",
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

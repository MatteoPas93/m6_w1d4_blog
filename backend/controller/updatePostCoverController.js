const postModel = require("../models/posts");

exports.patchPostCover = async (request, response) => {
  const { id } = request.params;
  const { cover } = request.body;

  try {
    const post = await postModel.findById(id);

    if (!post) {
      return response.status(404).json({
        message: "Post not found!",
      });
    }

    post.cover = cover;
    await post.save();

    response.json({
      message: "Cover updated successfully!",
      post,
    });
  } catch (error) {
    console.error("Error updating cover", error);
    response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

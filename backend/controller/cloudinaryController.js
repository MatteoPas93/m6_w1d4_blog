const cloudinary = require("../utils/cloudinary");

exports.postCloudinary = (request, response) => {
  cloudinary.uploader.upload(request.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return response.status(500).json({
        success: false,
        message: "Error uploading",
      });
    }

    response.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
};

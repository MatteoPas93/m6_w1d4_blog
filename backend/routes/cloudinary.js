const express = require('express');
const cloudinaryRoute = express.Router();
const cloudinaryController = require('../controller/cloudinaryController');
const upload = require('../middlewares/multerStorage');

cloudinaryRoute.post('/uploadFile', upload.single('image'), cloudinaryController.postCloudinary)

module.exports = cloudinaryRoute;
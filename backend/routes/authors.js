const express = require("express");
const router = express.Router();
const logger = require('../middlewares/logger')
const validateAuthor = require('../middlewares/validateAuthor')
const authorController = require('../controller/authorController')

router.get("/getAuthors", logger, authorController.getAuthors);

router.get("/getAuthor/:id", authorController.getAuthor);

router.post("/createAuthor", validateAuthor,  authorController.postAuthor);

router.patch("/updateAuthor/:id", authorController.patchAuthor);

router.delete("/deleteAuthor/:id", authorController.deleteAuthor);

module.exports = router;

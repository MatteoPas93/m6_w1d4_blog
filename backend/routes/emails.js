const express = require("express");
const routerEmail = express.Router();

const emailController = require("../controller/emailController")

routerEmail.post("/sendEmail", emailController.sendEmail );

module.exports = routerEmail;
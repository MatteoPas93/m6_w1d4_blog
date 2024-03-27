const express = require("express");
const login = express.Router();
const loginController = require('../controller/loginController');

login.post("/login", loginController.loginPost)

module.exports = login;

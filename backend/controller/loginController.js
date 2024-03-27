const userModel = require('../models/authors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const email = require('../models/email')
// const nodemailer = require('nodemailer')

exports.loginPost = async (request, response) => {
    try {
      const author = await userModel.findOne({
        email: request.body.email,
      });
      if (!author) {
        return response.status(404).send({
          statusCode: 404,
          message: "This author not exist!",
        });
      }
      const isPasswordValide = await bcrypt.compare(
        request.body.password,
        author.password
      );
  
      if (!isPasswordValide) {
        return response.status(401).send({
          statusCode: 401,
          message: "Unauthorized",
        });
      }
  
      const token = jwt.sign(
        {
          name: author.name,
          surname: author.surname,
          birthday: author.birthday,
          email: author.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

    //   // Invio dell'email
    // const transporter = nodemailer.createTransport({
    // });

    // const mailOptions = {
    //   from: 'example@email.it',
    //   to: '',
    //   subject: 'Login Successful',
    //   text: 'You have successfully logged in.',
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //   } else {
    //     console.log("Email sent:", info.response);
    //   }
    // });
  
      response.header("Authorization", token).status(200).send({
        statusCode: 200,
        message: "Login successful",
        token,
      });
    } catch (error) {
      response.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  };
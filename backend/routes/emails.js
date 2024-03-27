// const express = require("express");
// const emailRouter = express.Router();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "matteo79@ethereal.email",
//     pass: "eyYNV12tDnv2cQ7PFh",
//   },
// });

// emailRouter.post("/sendEmail", async (request, response) => {
//   const { recipient, subject, text } = request.body;
//   const mailOptions = {
//     from: "email@email.com",
//     to: recipient,
//     subject: subject,
//     text: text,
// }

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       response.status(404).send({
//         statusCode: 404,
//         message: "Email does not found!",
//       });
//     } else {
//       console.log("Email inviata");
//       response.send("Email sent successfully");
//     }
//   });
// });

// module.exports = emailRouter;



const express = require("express");
const routerEmail = express.Router();

const emailController = require("../controller/emailController")

routerEmail.post("/sendEmail", emailController.sendEmail );

module.exports = routerEmail;
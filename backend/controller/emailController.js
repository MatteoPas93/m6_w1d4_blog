const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "aditya43@ethereal.email",
      pass: "fC6UYF9MDysynVPusJ",
    },
  });

exports.sendEmail = async (request, response) => {
  const { recipient, subject, text } = request.body;

  const mailOptions = {
    from: "email@email.com",
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      response.status(404).send({
        statusCode: 404,
        message: "Email not found",
      });
    } else {
      console.log("Email inviata");
      response.send("Email sent successfully");
    }
  });
};
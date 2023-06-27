require("dotenv").config();
const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const { configEmail } = require("../config/verifyConfigEmail");

exports.verify = (value, url) => {
  const { firstName, lastName, email } = value;
  //   console.log(req.body);

  config = {
    service: "gmail",
    auth: {
      user: configEmail.EMAIL,
      pass: configEmail.PASSWORD,
    },
  };

  const transport = nodemailer.createTransport(config);

  const mailGenerator = new MailGen({
    theme: "default",
    product: {
      name: "Boardify",
      link: "http://localhost:5174/",
    },
  });

  const formattemail = {
    body: {
      name: firstName + " " + lastName,
      intro: "Thanks for signing up for Boardify",
      action: {
        instuctions: "To get started with Boardify, please click here:",
        button: {
          color: "#2265bc",
          text: "Confirm your account",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const mail = mailGenerator.generate(formattemail);

  const mailReceiver = {
    from: "Boardify Admin" + " " + configEmail.EMAIL,
    to: email + " " + firstName,
    subject: "Wellcome New User",
    html: mail,
  };

  transport.sendMail(mailReceiver, function (error) {
    if (error) {
      res.status(500).json("Error");
    } else {
      console.log("Email sent complete");
    }
  });
};

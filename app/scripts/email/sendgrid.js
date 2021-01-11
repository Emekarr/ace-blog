const sg = require("@sendgrid/mail");

const api = process.env.apikey

sg.setApiKey(api);

const sendMail = (feedbackMail, message) => {
  const msg = {
    to: feedbackMail,
    from: "aceanyanwu02@gmail.com",
    subject: "Thank you for reaching out to us",
    text: message,
  };

  sg.send(msg);
};

module.exports = sendMail

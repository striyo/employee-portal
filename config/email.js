const nodemailer = require('nodemailer');
const config = {
  host: "mail.re-rx.com",
  name: "mail.re-rx.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'portal@re-rx.com', // generated ethereal user
    pass: 'REMpa$$107', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
}

let transporter = nodemailer.createTransport(config);

module.exports = {
  transporter
};
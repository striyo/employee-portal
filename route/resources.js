// what you need for routes
const express = require('express');
const router = express.Router();

const pdf = require('html-pdf');
const template = require('../config/emailTemplate.js');
const mail = require('../config/email.js');
const hrEmail = 'toteeset1@gmail.com';

// time off request
router.post('/timeoff', (req, res) => {
  // check if logged
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }

  // check if all fields are filled
  if (!req.body.reason || !req.body.startDate || !req.body.endDate) {
    return res.status(422).json({
      message: 'Please fill out all required form fields',
    });
  }

  // generate pdf
  pdf.create(template.timeOffTemplate(req.session.user.name, req.body.startDate, req.body.endDate, req.body.reason)).toBuffer((err, buffer) => {
    let mailInfo = {
      from: '"Royal Emerald Portal" <portal@re-rx.com>',
      to: [req.session.user.email, hrEmail],
      subject: "Time Off Request",
      html: template.timeOffTemplate(req.session.user.name, req.body.startDate, req.body.endDate, req.body.reason),
      attachments: {
        filename: 'timeoff.pdf',
        content: buffer,
      },
    };

    // email pdf to HR and to employee
    mail.transporter.sendMail(mailInfo).then(() => {
      return res.status(200).json({
        message: 'Time off request sent',
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
  });

});

router.post('/purchase', (req, res) => {
  // check if logged
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }

  // check if all fields are filled
  if (!req.body.department || !req.body.items|| !req.body.purpose || !req.body.total) {
    return res.status(422).json({
      message: 'Please fill out all required form fields',
    });
  }

  let data = {
    name: req.session.user.name,
    department: req.body.department,
    items: req.body.items,
    purpose: req.body.purpose,
    total: req.body.total,
  };

  // generate pdf
  pdf.create(template.purchaseTemplate(data)).toBuffer((err, buffer) => {
    let mailInfo = {
      from: '"Royal Emerald Portal" <portal@re-rx.com>',
      to: [req.session.user.email, hrEmail],
      subject: "Purchase Request",
      html: template.purchaseTemplate(data),
      attachments: {
        filename: 'purchase.pdf',
        content: buffer,
      },
    };

    // email pdf to HR and to employee
    mail.transporter.sendMail(mailInfo).then(() => {
      return res.status(200).json({
        message: 'Purchase request sent',
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
  });
});

module.exports = router;
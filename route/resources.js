// what you need for routes
const express = require('express');
const router = express.Router();
const multer = require('multer');

// import packages
const pdf = require('html-pdf');
const template = require('../config/emailTemplate.js');
const mail = require('../config/email.js');
const fs = require('fs');
const path = require('path');

var storage = multer.memoryStorage();
var upload = multer({storage: storage});

// variables
const hrEmail = 'cse110tthr@gmail.com'; // G@ryisc00l

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

  // check if dates are valid
  if (req.body.endDate > req.body.startDate) {
    return res.status(422).json({
      message: 'Dates entered are invalid',
    });
  }

  // generate pdf
  pdf.create(template.timeOffTemplate(req.session.user.name, req.body.startDate, req.body.endDate, req.body.reason)).toBuffer((err, buffer) => {
    let mailInfo = {
      from: '"Royal Emerald Portal" <portal@re-rx.com>',
      to: [hrEmail, req.session.user.email],
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
    date: (new Date()).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
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

// report
router.post('/report', upload.single('document'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // check if logged in
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }

  // check if required fields are there
  if (!req.body.detailPeople || !req.body.detailBody || !req.body.detailDate || !req.body.detailTime || !req.body.detailDuration) {
    return res.status(422).json({
      message: 'Please fill in all required form fields',
    });
  }

  // generate pdf
  pdf.create(template.reportTemplate(req.body, req.session.user)).toBuffer((err, buffer) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }

    let attachment = [
      {
        filename: 'report.pdf',
        content: buffer,
      },
    ];

    // check if file uploaded
    if(req.file != null){
      attachment = [
        {
          filename: 'reportdocument.pdf',
          content: req.file.buffer,
        },
        {
          filename: 'report.pdf',
          content: buffer,
        },
      ];
    }

    // mail to hr and user
    let mailInfo = {
      from: '"Royal Emerald Portal" <portal@re-rx.com>',
      to: hrEmail,
      bcc: req.session.user.email,
      subject: "Anonymous Report Filed",
      html: template.reportTemplate(req.body, req.session.user),
      attachments: attachment,
    };

    // email pdf to HR and to employee
    mail.transporter.sendMail(mailInfo).then(() => {
      return res.status(200).json({
        message: 'Report sent. A copy of the report has been emailed to you.',
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
  });
});

// get files
router.get('/doc/:file', (req,res) => {
  // check if logged in
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  let file = `${path.dirname(__filename)}/../documents/${req.params.file}`;
  console.log(file);

  fs.access( file, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }

    return res.status(200).sendFile(path.resolve(file));
  });
});

router.get('/doc', (req, res) => {
  // check if logged in
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  let dir = `${path.dirname(__filename)}/../documents/`;
  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({
        message: "Error in fetching documents",
      });
    }

    return res.status(200).json({
      message: 'Files retrieved',
      files,
    });
  });
});
module.exports = router;
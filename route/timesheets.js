// what you need for routes
const express = require('express');
const router = express.Router();

// import packages
const pdf = require('html-pdf');
const template = require('../config/emailTemplate.js');
const mail = require('../config/email.js');
const fs = require('fs');
const path = require('path');

// models
const {getUser, getAllUser, createUser, updatePassword, searchUsers, updateUser} = require('../model/UserModel.js');

const {getHours, updateHours, createHours} = require('../model/HourModel');

// generate timesheets
router.post('/', (req, res) => {
  // check if logged
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }

  // check if admin
  if (!req.session.user.is_admin){
    return res.status(403).json({
      message: 'Access Denied',
    });
  }

  // check if fields are filled
  if( !req.body.startDate || !req.body.endDate ){
    return res.status(422).json({
      message: 'Please fill out all required form fields',
    });
  }

  // check if user passed if not generating for all
  if( req.body.all && !req.body.employee ){
    return res.status(422).json({
      message: 'Please fill out all required form fields 2',
    });
  }

  // get all hours
  getHours(req.body.startDate, req.body.endDate, req.body.employee.user_id).then((hours) => {
    // generate timesheets
    pdf.create(template.timesheetTemplate(req.body, hours)).toFile(`./timesheets/${req.body.employee.user_id}/(${req.body.startDate})-(${req.body.endDate}).pdf`, (err) => {
      if(err){
        console.log(err);
      }

      return res.status(200).json({
        message: "Timesheet generated",
      });
    })
  });
});

router.get('/:id', (req, res) => {
  // check if logged
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Access Denied',
    });
  }

  // check if it is the user making the request
  if (req.session.user.user_id != req.params.id){
    return res.status(403).json({
      message: 'Access Denied',
    });
  }

  let dir = `./timesheets/${req.params.id}/`;
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

// get files
router.get('/:id/:file', (req,res) => {
  // check if logged
  if (req.session.user == null){
    return res.status(403).json({
      message: 'Access Denied',
    });
  }

  // check if it is the user making the request
  if (req.session.user.user_id != req.params.id){
    return res.status(403).json({
      message: 'Access Denied',
    });
  }

  let file = `./timesheets/${req.params.id}/${req.params.file}`;

  fs.access( file, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }

    return res.status(200).sendFile(path.resolve(file));
  });
});
module.exports = router;
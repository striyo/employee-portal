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
const {getAllHourlyUser, getAllUser} = require('../model/UserModel.js');

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
  if( req.body.all == false && req.body.employees.length == 0 ){
    return res.status(422).json({
      message: 'Please fill out all required form fields 2',
    });
  }

  let promises = [];

  for(let i = 0; i < req.body.employees.length; i++) {
    // get all hours
    promises.push(getHours(req.body.startDate, req.body.endDate, req.body.employees[i].user_id));
  }


  Promise.all(promises).then((hours) => {
    return new Promise((resolve, reject) => {
      let counter = 0;
      for(let i = 0; i < hours.length; i++){
        // generate timesheets
        pdf.create(template.timesheetTemplate(req.body.startDate, req.body.endDate, req.body.employees[i], hours[i])).toFile(`./timesheets/${req.body.employees[i].user_id}/(${req.body.startDate})-(${req.body.endDate}).pdf`, (err) => {
          if(err){
            console.log(err);
            reject();
          }
          
          counter++
          if( counter == hours.length ){
            resolve();
          }
        });
      }
    })
  }).then(() => {
    return res.status(200).json({
      message: "Timesheets generated",
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error in generating timesheets",
    });
  });
});

// generate all timesheets
router.post('/all', (req, res) => {
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

  let promises = [];

  // get all hourly users
  getAllHourlyUser().then((users) => {
    for(let i = 0; i < users.length; i++) {
      // get all hours
      promises.push(getHours(req.body.startDate, req.body.endDate, users[i].user_id));
    }

    Promise.all(promises).then((hours) => {
      return new Promise((resolve, reject) => {
        let counter = 0;
        for(let i = 0; i < hours.length; i++){
          // generate timesheets
          pdf.create(template.timesheetTemplate(req.body.startDate, req.body.endDate, users[i], hours[i])).toFile(`./timesheets/${users[i].user_id}/(${req.body.startDate})-(${req.body.endDate}).pdf`, (err) => {
            if(err){
              console.log(err);
              reject();
            }
            
            counter++
            if( counter == hours.length ){
              resolve();
            }
          });
        }
      })
    }).then(() => {
      return res.status(200).json({
        message: "Timesheets generated",
      });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error in generating timesheets",
      });
    });
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
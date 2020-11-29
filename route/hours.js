// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//user model
const {get, getAllUser, createUser, updatePassword, searchUsers, updateUser} = require('../model/UserModel.js');
//hourModel
const {getHours, updateHours, createHours, deleteHours} = require('../model/HourModel');

//send the post request
router.post('/log', (req, res) => {
  //check if all the inputs are made
  
  // if(!req.body.timein||!req.body.timeout||!req.body.mealin||!mealout){
  //   // console.log(req.body.timein);
  //   return res.status(422).json({
  //     message: 'Please fill out all required fields',
  //   });
  // }

  //check if the inputs make sense
  //viewHours for the day
  const today = new Date();
  const today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let temp_time_in = (req.body.timein == null) ? '00:00': req.body.timein;
  let temp_time_out = (req.body.timeout== null)? '00:00':req.body.timeout;
  let temp_meal_in = (req.body.mealin == null) ? '00:00' : req.body.mealin;
  let temp_meal_out = (req.body.mealout== null)? '00:00':req.body.mealout;
  let total = ((parseInt(temp_time_out.split(":")[0] * 60) + parseInt(temp_time_out.split(":")[1])) - (parseInt(temp_meal_out.split(":")[0] * 60) + parseInt(temp_meal_out.split(":")[1])) +
    (parseInt(temp_meal_in.split(":")[0] * 60) + parseInt(temp_meal_in.split(":")[1])) - (parseInt(temp_time_in.split(":")[0] * 60) + parseInt(temp_time_in.split(":")[1]))) / 60;

  if(req.body.timein == null || req.body.timeout == null || req.body.mealin == null || req.body.mealout == null){
    // console.log(req.body.timein);
    total = 0;
  } else {
    if ((req.body.timein > req.body.mealin) || (req.body.mealin > req.body.mealout) ||
      (req.body.mealout > req.body.timeout)) {
      return res.status(422).json({
        message: "Hours do match time constraints",
      });
    }
  }

  getHours(today_date, today_date, req.session.user.user_id).then((hour) =>{
    if(hour.length == 0) { 
      //create
      return createHours(req.session.user.user_id, today_date, req.body.timein, req.body.timeout, req.body.mealin, req.body.mealout, total);
    } else {
      //set the hours to the respective times
      return updateHours(req.body.timein, req.body.mealout, req.body.mealin, req.body.timeout, total, req.session.user.user_id, today_date);
    }
  }).then(()=>{
    return res.status(200).json({
      message: 'Your hours have been updated.',
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
  //search//get
  
})

//UPDATE HOURS BY ADMIN
router.post('/update', (req, res) => {
  let date = new Date(req.body.date);

  console.log("date  " + req.body.timein);
  console.log("meal out" + req.body.mealout);
  console.log("meal in" + req.body.mealin);
  console.log("time out" + req.body.timeout);

  let total = ((parseInt(req.body.timeout.split(":")[0] * 60) + parseInt(req.body.timeout.split(":")[1])) - (parseInt(req.body.mealout.split(":")[0] * 60) + parseInt(req.body.mealout.split(":")[1])) +
      (parseInt(req.body.mealin.split(":")[0] * 60) + parseInt(req.body.mealin.split(":")[1])) - (parseInt(req.body.timein.split(":")[0] * 60) + parseInt(req.body.timein.split(":")[1]))) / 60;

  updateHours(req.body.timein, req.body.mealout, req.body.mealin, req.body.timeout, total, req.body.user_id, date).then(()=>{
    return res.status(200).json({
      message: 'The hours have been updated.',
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//makes a reqs
router.post('/search', (req, res) => {
  //admit - if admin specify email req.session.user.is_admin
  //for pleabs
  // console.log(req.session.user.user_id);
  getHours(req.body.startDate, req.body.endDate, req.session.user.user_id).then((hour) =>{
    return res.status(200).json({
      message: "Hours found",
      hour: hour,
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//makes a reqs
router.post('/delete', (req, res) => {
  //admit - if admin specify email req.session.user.is_admin
  //for pleabs
  // console.log('this is the hour id'+req.body.hours_id);
  deleteHours(req.body.hours_id).then(() =>{
    return res.status(200).json({
      message: "Hours deleted",
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//makes a reqs
router.post('/admin/search', (req, res) => {
  //admit - if admin specify email req.session.user.is_admin
  let id;
  searchUsers(req.body.searchID).then((user) =>{
  id = (user[0].user_id);
    getHours(req.body.startDate, req.body.endDate, id).then((hour) =>{
      return res.status(200).json({
        message: "Hours found",
        hour: hour,
      });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    });
  return console.log(id);
  });
})

module.exports = router;
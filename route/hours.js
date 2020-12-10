// what you need for routes
const express = require('express');
const router = express.Router();

//user model
const { getAllUser, createUser, updatePassword, searchUsers, updateUser, getUser } = require('../model/UserModel.js');
//hourModel
const { getTodaysHours, getHours, updateHours, createHours, deleteHours, searchHours} = require('../model/HourModel');

//send the post request
router.post('/log', (req, res) => {
  // check if user is logged in
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if ((req.body.timein > req.body.mealin) || (req.body.mealin > req.body.mealout) || (req.body.mealout > req.body.timeout)) {
    return res.status(422).json({
        message: "Hours do not match time constraints",
    });
  }

  // check if there is already an entry for today
  getTodaysHours(req.session.user.user_id).then((hours) => {
    if(hours.length == 0){
      return createHours(req.session.user.user_id, req.body);
    } else {
      return updateHours(req.session.user.user_id, req.body);
    }
  }).then(() => {
    return res.status(200).json({
      message: "Hours logged",
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error in logging hours",
    });
  });
})

//UPDATE HOURS BY ADMIN
router.post('/update', (req, res) => {
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if(req.session.user.is_admin == 0){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if ((req.body.timein > req.body.mealin) || (req.body.mealin > req.body.mealout) || (req.body.mealout > req.body.timeout)) {
    return res.status(422).json({
      message: "Hours do not match time constraints",
    });
  }

  updateHours(req.body.user_id, req.body).then(() => {
      return res.status(200).json({
          message: 'The hours have been updated',
      });
  }).catch((err) => {
      console.log(err);
      return res.status(500).json({
          message: err,
      });
  });
})

// search for hours
router.post('/search', (req, res) => {
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if (!req.body.startDate || !req.body.endDate) {
    return res.status(422).json({
      message: "Please input both search dates",
    });
  }
  //admit - if admin specify email req.session.user.is_admin
  //for pleabs
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
  })
})

//searches for all hours from a searched employee and between two dates
router.post('/admin/search', (req, res) => {
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if (!req.body.search || !req.body.startDate || !req.body.endDate) {
    return res.status(422).json({
      message: "Please input all search fields",
    });
  }

  if( req.body.startDate > req.body.endDate ) {
    return res.status(422).json({
      message: "Dates do not meet time constraints",
    });
  }

  searchUsers(req.body.search).then((users) => {
    if (users.length === 0) {
      return res.status(422).json({
        message: "No employees found",
      });
    }

    return searchHours(users, req.body.startDate, req.body.endDate);
  }).then((hours) => {
    return res.status(200).json({
      message: "Hours Fetched",
      hours,
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//creates a new log for the searched employee
router.post('/', (req, res) => {
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }


  if (!req.body.user || !req.body.date || !req.body.hours.mealin || !req.body.hours.timein || !req.body.hours.timeout || !req.body.hours.mealout || req.body.hours.total == null) {
    return res.status(422).json({
      message: "Please input all fields",
    });
  }

  // time constraint check
  if ((req.body.hours.timein > req.body.hours.mealin) || (req.body.hours.mealin > req.body.hours.mealout) || (req.body.hours.mealout > req.body.hours.timeout)) {
    return res.status(422).json({
        message: "Hours do not match time constraints",
    });
  }

  //check if user is an hourly user
  getUser(req.body.user.email).then((user) => {
    if(user[0].salaried == 1){
      return Promise.reject("Can not log hours for an hourly employee");
    }

    // check if hours have been logged already
    return getHours(req.body.date, req.body.date, req.body.user.user_id);
  }).then((hours) => {
    if(hours.length != 0) {
      return Promise.reject("User hours already exists");
    }

    return createHours(req.body.user.user_id, req.body.hours);
  }).then(() => {
    return res.status(200).json({
      message: "Hours created",
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
    if (req.session.user == null || req.session.user.is_admin == 0) {
        return res.status(403).json({
            message: "Access Denied",
        });
    }
    deleteHours(req.body.hours_id).then(() => {
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

module.exports = router;

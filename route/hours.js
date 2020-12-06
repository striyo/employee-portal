// what you need for routes
const express = require('express');
const router = express.Router();

//user model
const { getAllUser, createUser, updatePassword, searchUsers, updateUser } = require('../model/UserModel.js');
//hourModel
const { getTodaysHours, getHours, updateHours, createHours, deleteHours, searchHours} = require('../model/HourModel');

//send the post request
/*
router.post('/log', (req, res) => {
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }
  //check if the inputs make sense
  //viewHours for the day
  const today = new Date();
  const today_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let temp_time_in = (req.body.timein == null) ? '00:00' : req.body.timein;
  let temp_time_out = (req.body.timeout == null) ? '00:00' : req.body.timeout;
  let temp_meal_in = (req.body.mealin == null) ? '00:00' : req.body.mealin;
  let temp_meal_out = (req.body.mealout == null) ? '00:00' : req.body.mealout;
  let total = ((parseInt(temp_time_out.split(":")[0] * 60) + parseInt(temp_time_out.split(":")[1])) - (parseInt(temp_meal_out.split(":")[0] * 60) + parseInt(temp_meal_out.split(":")[1])) +
      (parseInt(temp_meal_in.split(":")[0] * 60) + parseInt(temp_meal_in.split(":")[1])) - (parseInt(temp_time_in.split(":")[0] * 60) + parseInt(temp_time_in.split(":")[1]))) / 60;

  if (req.body.timein == null || req.body.timeout == null || req.body.mealin == null || req.body.mealout == null) {
      // console.log(req.body.timein);
      total = 0;
  } else {
      if ((req.body.timein > req.body.mealin) || (req.body.mealin > req.body.mealout) ||
          (req.body.mealout > req.body.timeout)) {
          return res.status(422).json({
              message: "Hours do not match time constraints",
          });
      }
  }

  getHours(today_date, today_date, req.session.user.user_id).then((hour) => {
      if (hour.length == 0) {
          //create
          return createHours(req.session.user.user_id, today_date, req.body.timein, req.body.timeout, req.body.mealin, req.body.mealout, total);
      } else {
          //set the hours to the respective times
          return updateHours(req.body.timein, req.body.mealout, req.body.mealin, req.body.timeout, total, req.session.user.user_id, today_date);
      }
  }).then(() => {
      return res.status(200).json({
          message: 'Your hours have been updated',
      });
  }).catch((err) => {
      console.log(err);
      return res.status(500).json({
          message: err,
      });
  });
})
*/
router.post('/log', (req, res) => {
  // check if user is logged in
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if (req.body.timein == null || req.body.timeout == null || req.body.mealin == null || req.body.mealout == null) {
    // console.log(req.body.timein);
    total = 0;
  } else if ((req.body.timein > req.body.mealin) || (req.body.mealin > req.body.mealout) || (req.body.mealout > req.body.timeout)) {
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

  if (!req.body.user || !req.body.date || !req.body.hours.mealin || !req.body.hours.timein || !req.body.hours.timeout || !req.body.hours.mealout || !req.body.hours.total) {
    return res.status(422).json({
      message: "Please input all fields",
    });
  }

  // check if user already have hours for the day
  getHours(req.body.date, req.body.date, req.body.user.user_id).then((hours) => {
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

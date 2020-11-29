// what you need for routes
const express = require('express');
const router = express.Router();

//user model
const { get, getAllUser, createUser, updatePassword, searchUsers, updateUser } = require('../model/UserModel.js');
//hourModel
const { getHours, updateHours, createHours, adminViewHours } = require('../model/HourModel');

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
            message: 'Your hours have been updated.',
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    });
    //search//get

})

//seraches for all hours between two dates for the current employee
router.post('/search', (req, res) => {
    getHours(req.body.startDate, req.body.endDate, req.session.user.user_id).then((hour) => {
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

//searches for all hours from a searched employee and between two dates
router.post('/id', (req, res) => {
    adminViewHours(req.body.search, req.body.startDate, req.body.endDate).then((hours) => {
        return res.status(200).json({
            message: "Hours found",
            hours: hours,
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    });
})

module.exports = router;
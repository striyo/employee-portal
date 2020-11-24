// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//eventModel
const {getEvent, createEvent, updateEvent, deleteEvent,} = require('../model/EventModel');

//send the post request
router.post('/add', (req, res) => {
  createEvent(req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.title, req.body.body).then(()=>{
    return res.status(200).json({
      message: 'Your event has been updated.',
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//send the post request
router.post('/search', (req, res) => {
  getEvent(req.body.title, req.body.startdDate, req.body.endDate).then((events)=>{
    return res.status(200).json({
      message: 'Events found',
      events:events,
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

//send the post request
router.post('/delete', (req, res) => {
  deleteEvent(req.body.event_id).then(()=>{
    console.log(req.body.event_id);
    return res.status(200).json({
      message: 'Event deleted',
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

module.exports = router;
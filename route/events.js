// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//eventModel
const {getEvent, createEvent, updateEvent, deleteEvent,} = require('../model/EventModel');

//send the post request
router.post('/', (req, res) => {
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if((!req.body.startTime) || (!req.body.endTime) || (!req.body.startDate) || (!req.body.endDate)) {
    return res.status(422).json({
      message: "Please input all dates and times",
    });
  }

  // check if valid time
  if((req.body.startDate > req.body.endDate) || ((req.body.startDate == req.body.endDate) && (req.body.startTime > req.body.endTime))){
    return res.status(422).json({
      message: "Times do not match time constraint",
    });
  }

  // Save to db
  createEvent(req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime, req.body.title, req.body.body).then(()=>{
    return res.status(200).json({
      message: 'Your event has been created',
    });
  }).catch((err)=>{
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})

router.get('/test', (req,res) => {
  test().then((now) => {
    return res.json({
      now,
    });
  })
})

router.get('/', (req, res) => {
  if(req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  getEvent(null, null, null).then((events) => {
    return res.status(200).json({
      message: "Events fetched",
      events,
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error in getting events",
    });
  });
});

// search events
router.post('/search', (req, res) => {
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
        message: "Access Denied",
    });
  }


  if( ( !req.body.startDate && req.body.endDate) || (req.body.startDate && !req.body.endDate)){
    return res.status(422).json({
      message: "Please fill out all dates if you want to include dates in your search query"
    })
  }

  if (req.body.startDate > req.body.endDate) {
    return res.status(422).json({
      message: "Dates do not match time constraint",
    });
  }

  getEvent(req.body.title, req.body.startDate, req.body.endDate).then((events)=>{
    return res.status(200).json({
      message: 'Events fetched',
      events,
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
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  deleteEvent(req.body.event_id).then(()=>{
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

//delete event
//send the post request
router.post('/update', (req, res) => {
  if (req.session.user == null || req.session.user.is_admin == 0) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }
  if ((req.body.startTime > req.body.endTime) || (req.body.startDate > req.body.endDate)) {
    return res.status(422).json({
      message: "Times do not match time constraint",
    });
  }
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  updateEvent(req.body.id, startDate, endDate, req.body.startTime, req.body.endTime, req.body.title, req.body.bodyParagraph).then(()=>{
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
module.exports = router;
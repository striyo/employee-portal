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
  getEvent(req.body.title, req.body.startDate, req.body.endDate).then((events)=>{
    let response = events;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < events.length; i++) {
      response[i].start_date = new Date(events[i].start_date);
    }
    const SortedEvents = response.sort((b, a) => b.start_date - a.start_date);
    return res.status(200).json({
      message: 'Events found',
      events:SortedEvents,
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

//delete event
//send the post request
router.post('/update', (req, res) => {
  console.log("update post is hit");
  console.log('event id : ' + req.body.id);
  let startDate = new Date(req.body.startDate);
  let endDate = new Date(req.body.endDate);
  updateEvent(req.body.id, startDate,endDate, req.body.startTime, req.body.endTime, req.body.title, req.body.bodyParagraph).then(()=>{
    return res.status(200).json({
      message: 'Your event has been updated.',
    });
  }).catch((err)=>{
    console.log('there is an error');
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
})
module.exports = router;
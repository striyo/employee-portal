// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//userModel
const { get, getAllUser, createUser, updatePassword, searchUsers, updateUser } = require('../model/UserModel.js');
//eventModel
const { createTodo, createTodoReceiver } = require('../model/TodosModel.js');

router.post('/add', (req, res) => {
  // check if user is logged in
  if( req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  let users_exist = true;
  let users_mult = false;
  let user_ids = [];
  let promises = [];
  let promises2 = [];
  createTodo(req.session.user.user_id, req.body.description).then(() => {

  }).catch((err) => {

  });

  for (let i = 0; i < peopleArr.length; i++) {
    promises.push(createTodoReciever(req.session.user.user_id, req.body.description));
  }

  Promise.all(promises).then((result) => {

  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
});

module.exports = router;
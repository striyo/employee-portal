// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//todosModel
const { getAllTodos, createTodo, createTodoReceiver, updateTodo, deleteTodoReceiver, deleteTodo, getTodos } = require('../model/TodosModel.js');

router.get('/all', (req, res) => {
  // check if user is logged in
  if( req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  getAllTodos(req.session.user.user_id).then((todos) => {
    return res.status(200).json({
      message: "Todo fetched",
      todos,
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err, 
    }); 
  });
  
});

// get todos
router.get('/type/:type', (req, res) => {
  // check if user is logged in
  if( req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  getTodos(req.session.user.user_id, req.params.type).then((todos) => {
    return res.status(200).json({
      message: "Todos Fetched",
      todos,
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err,
    }); 
  });
})


// create todos
router.post('/', (req, res) => {
  // check if user is logged in
  if( req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  if (!req.body.description){
    return res.status(422).json({
      message: "Please enter a todo item",
    });
  }

  let promises = [];

  let people = [req.session.user];

  if( req.body.peopleArr.length != 0){
    people = req.body.peopleArr;
  }

  createTodo(req.session.user.user_id, req.body.description).then((result) => {
    for (let i = 0; i < people.length; i++) {
      promises.push(createTodoReceiver(result.insertId, people[i].user_id));
    }

    Promise.all(promises).then(() => {
      return res.status(200).json({
        message: "Todos created",
      });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
});

// update todos
router.put('/', (req, res) => {
  // check if user is logged in
  if( req.session.user == null){
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  updateTodo(req.body.todos_receiver_id, req.body.completed).then(() => {
    return res.status(200).json({
      message: "Todo updated",
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err,
    });
  });
});

// delete all todos
router.delete('/', (req, res) => {
  // check if user is logged in
  if (req.session.user == null) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  deleteTodoReceiver(req.session.user.user_id).then(() => {
    return deleteTodo();
  }).then(() => {
    return res.status(200).json({
      message: "Todo deleted",
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error in deleting todos",
    });
  });
});

module.exports = router;
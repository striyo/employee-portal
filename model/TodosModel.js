/*
  
*/
const { end } = require('./db.js');
const db = require('./db.js');

/**
 * CreateHours
 * 
 * @param receiver_id
 * @param completed
 */
function getTodos(receiver_id, completed) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT x.*, y.item FROM todos_receiver x, todos y WHERE x.todos_id = y.todos_id AND x.receiver_id = ? AND x.complete = ?`;
        db.query(sql, [receiver_id, completed], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

/**
 * CreateHours
 * 
 * @param receiver_id
 */
function getAllTodos(receiver_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT x.*, y.item FROM todos_receiver x, todos y WHERE x.todos_id = y.todos_id AND x.receiver_id = ?`;
        db.query(sql, [receiver_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

/**
 * CreateHours
 * 
 * @param send_id
 * @param description
 */
function createTodo(send_id, description) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO todos (send_id, item) VALUES (?, ?);`;
        db.query(sql, [send_id, description], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

/**
 * CreateHours
 * 
 * @param send_id
 * @param description
 * @param receiver_id
 */
function createTodoReceiver(todos_id, receiver_id) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO todos_receiver (todos_id, receiver_id, complete) VALUES (?, ?, 0);`;
        db.query(sql, [todos_id, receiver_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

/**
 * CreateHours
 * 
 * @param todos_receiver_id
 * @param completed
 */
function updateTodo(todos_receiver_id, completed) {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE todos_receiver SET complete = ? WHERE todos_receiver_id = ?
        `;
        db.query(sql, [completed, todos_receiver_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

/**
 * Delete Todos 
 * 
 * @param receiver_id
 */
function deleteTodoReceiver(receiver_id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM todos_receiver WHERE receiver_id = ? AND complete = 1;`;
    db.query(sql, [receiver_id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

/**
 * Delete Todos 
 * 
 * @param todo_id
 */
function deleteTodo() {
  return new Promise((resolve, reject) => {
    const sql = `SET SQL_SAFE_UPDATES = 0; DELETE FROM todos x WHERE NOT EXISTS (SELECT * FROM todos_receiver y WHERE x.todos_id = y.todos_id); SET SQL_SAFE_UPDATES = 1;`;
    db.query(sql, (err, result) => {
      if (err) {
          reject(err);
      }
      resolve(result);
    })
  });
}



module.exports = {
    getTodos,
    createTodo,
    createTodoReceiver,
    updateTodo,
    deleteTodoReceiver,
    getAllTodos,
    deleteTodo,
}
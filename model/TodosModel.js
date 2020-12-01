/*
  
*/
const { end } = require('./db.js');
const db = require('./db.js');

/**
 * CreateHours
 * 
 * @param send_id
 * @param description
 */
function createTodo(send_id, description) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO todos (send_id, item) SELECT ?, ? FROM dual WHERE NOT EXISTS (SELECT * FROM todos WHERE send_id = ? AND item = ?);`;
        db.query(sql, [send_id, description, send_id, description], (err, result) => {
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
function createTodoReceiver(send_id, description, receiver_id) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO todos_receiver (todos_id, receiver_id, complete) SELECT x.todos_id, ?, 0 FROM todos x WHERE x.send_id = ? AND x.item = ?
         AND NOT EXISTS (SELECT * FROM todos_receiver y WHERE x.todos_id = y.todos_id AND y.receiver_id = ?);`;
        db.query(sql, [receiver_id, send_id, description, receiver_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}



module.exports = {
    createTodo,
    createTodoReceiver,
}
/*
  
*/
const { end } = require('./db.js');
const db = require('./db.js');

/**
 * CreateHours
 * 
 * @param timein
 * @param timeout
 * @param mealin
 * @param mealout
 * @param date
 * @param user_id
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


module.exports = {
    createTodo,
}
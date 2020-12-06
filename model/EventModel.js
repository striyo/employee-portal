const db = require('./db.js');
const formatTime = `TIME_FORMAT(end_time, '%h:%i %p') AS formatted_end_time, TIME_FORMAT(start_time, '%h:%i %p') AS formatted_start_time`;

const formatDate = `DATE_FORMAT(start_date, '%a, %b %d, %Y') AS formatted_start_date, DATE_FORMAT(end_date, '%a, %b %d, %Y') AS formatted_end_date`;

/**
   * CreateHours
   * @param title -req
   * @param body 
   * @param start_date -req
   * @param end_date - req
   * @param start_time - req
   * @param end_time -req
   */
function createEvent( start_date, end_date, start_time, end_time, title, body){
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO events (start_date, end_date, start_time, end_time, title, body) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [start_date, end_date, start_time, end_time, title, body], (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  });
}

/**
 * Get Event: Get the event
 * @param name 
 * @param start_date
 * @param end_date
 */
function getEvent(title, start_date, end_date) {
  return new Promise((resolve, reject) => {

    let sql = `SELECT *, ${formatTime}, ${formatDate} FROM events WHERE start_date >= CAST(? AS DATE) AND start_date <= CAST(? AS DATE) AND title LIKE ?`;
    let vars = [start_date, end_date, `%${title}%`];
    if( title && start_date == null ){
      sql = `SELECT *, ${formatTime}, ${formatDate} FROM events WHERE title like ?`;
      vars = [`%${title}%`];
    } else if ((title == null || title == '') && start_date != null) {
      sql = `SELECT *, ${formatTime}, ${formatDate} FROM events WHERE start_date >= CAST(? AS DATE) AND start_date <= CAST(? AS DATE) `;
      vars = [start_date, end_date];
    } else if( (title == null || title == '') && start_date == null) {
      sql = `SELECT *, ${formatTime}, ${formatDate} FROM events WHERE start_date >= CURRENT_DATE() ORDER BY start_date ASC LIMIT 20`;
      vars = [];
    }

    //query using the  name & dates insert
    db.query(sql, vars, (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  })
}

/**
 * Update Event: change the current hours for today
 * 
 * @param timein
 * @param mealout
 * @param mealin
 * @param timeout
 */
function updateEvent(event_id, start_date, end_date, start_time, end_time, title, body){
  //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
  //query the databae to find where userID = currentUser and date = today
  console.log(event_id);
  return new Promise((resolve, reject) => {
    const sql = `
    UPDATE events SET start_date = ?, end_date = ?, start_time = ?, end_time = ?, title = ?, body = ? WHERE event_id = ?
    `;
    db.query(sql, [start_date, end_date, start_time, end_time, title, body, event_id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })

}

/**
 * Update Event: change the current hours for today
 * 
 * @param timein
 * @param mealout
 * @param mealin
 * @param timeout
 */
function deleteEvent(event_id){
  //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
  //query the databae to find where userID = currentUser and date = today

  return new Promise((resolve, reject) => {
    const sql = `
    DELETE FROM events WHERE event_id = ?
    `;
    db.query(sql, [event_id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })

}

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
}
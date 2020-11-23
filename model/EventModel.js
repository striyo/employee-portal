/*
  
*/
const db = require('./db.js');

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
      const sql = `INSERT INTO events (start_date, end_date, start_time, end_time, title, body) VALUES (?, ?, ?, ?, ?, ?, ?);`;
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
function getEvent(name, start_date, end_date){
  return new Promise((resolve, reject) => {
    start_date = (start_date == null) ? 0: start_date;  //beginning of time by default
    end_date = (end_date == null) ? 10000: end_date;  //beginning of time by default
    if(name){
      //query using the  name & dates
      const sql = `select * from events where name=? and start_date >= CAST(? AS DATE) AND end_date <= CAST(? AS DATE);`;
      db.query(sql, [name, start_date, end_date], (err, result) => {
        if( err ){
          reject(err);
        }
        resolve(result);
      })
    }
    else{
      //query using the dates
      const sql = `select * from events where start_date >= CAST(? AS DATE) AND end_date <= CAST(? AS DATE);`;
      db.query(sql, [start_date, end_date], (err, result) => {
        if( err ){
          reject(err);
        }
        resolve(result);
      })
    }
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
function deleteEvent(event_id, start_date, end_date, start_time, end_time, title, body){
  //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
  //query the databae to find where userID = currentUser and date = today

  return new Promise((resolve, reject) => {
    const sql = `
    DELETE events WHERE event_id = ?
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
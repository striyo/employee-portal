/*
  
*/
const db = require('./db.js');

/**
 * View Hours: Get the hour(s) for the specified dates
 *
 * @param start_date
 * @param end_date
 */
function getHours(start_date, end_date, user_id){
  //same date?
  //edge case- endDate < startDate, endDate (less than today) 
  //query the database where user = currentUser and dates after Startdate and dates before endDate

  //return each data
  return new Promise((resolve, reject) => {
    const sql = `select * from hours where user_id =? and date >= CAST(? AS DATE) AND date <= CAST(? AS DATE);`;
    db.query(sql, [user_id, start_date, end_date], (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  })
}

/**
 * Set Hours: change the current hours for today
 * 
 * @param timein
 * @param mealout
 * @param mealin
 * @param timeout
 */
  function updateHours(timein, mealout, mealin, timeout, total, user_id, date){
    //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
    //query the databae to find where userID = currentUser and date = today

    return new Promise((resolve, reject) => {
      const sql = `
      UPDATE hours SET clock_in = ?, meal_out = ?, meal_in = ?, clock_out = ?, total = ? WHERE user_id = ? AND date = ?
      `;

      db.query(sql, [timein, mealout, mealin, timeout, total, user_id, date], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })

  }

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
  function createHours(user_id, date, timein, timeout, mealin, mealout, total){
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO hours (user_id, date, clock_in, clock_out, meal_in, meal_out, total) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      db.query(sql, [user_id, date, timein, timeout, mealin, mealout, total], (err, result) => {
        if( err ){
          reject(err);
        }
        resolve(result);
      })
    });
  }

/**
  * Delete Hours: delete the current hours for today
  * 
  * @param hour_id
  */
   function deleteHours(hour_id){
     //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
     //query the database to find where userID = currentUser and date = today
     console.log(hour_id);
 
     return new Promise((resolve, reject) => {
       const sql = `
       DELETE FROM hours WHERE hours_id = ?
       `;
 
       db.query(sql, [hour_id], (err, result) => {
         if (err) {
           reject(err);
         }
         resolve(result);
       })
     })
 
   }

module.exports = {
  getHours,
  updateHours,
  createHours,
  deleteHours,
}
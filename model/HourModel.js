const db = require('./db.js');
const formatTime = `TIME_FORMAT(clock_in, '%h:%i %p') AS formatted_clock_in, TIME_FORMAT(clock_out, '%h:%i %p') AS formatted_clock_out, TIME_FORMAT(meal_in, '%h:%i %p') AS formatted_meal_in, TIME_FORMAT(meal_out, '%h:%i %p') AS formatted_meal_out
`;

const formatDate = `DATE_FORMAT(date, '%a, %b %d, %Y') AS formatted_date`;

/**
 * Get Today's Hours: Get the hour(s) for today
 *
 * @param user_id
 */
function getTodaysHours(user_id) {
  return new Promise((resolve, reject) => {
    const sql = `select * from hours where user_id =? and date = current_date()`;
    db.query(sql, [user_id], (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  });
}

/**
 * View Hours: Get the hour(s) for the specified dates with correctly formated dates
 *
 * @param start_date
 * @param end_date
 */
function getHours(start_date, end_date, user_id) {
    //same date?
    //edge case- endDate < startDate, endDate (less than today) 
    //query the database where user = currentUser and dates after Startdate and dates before endDate
  //return each data
  return new Promise((resolve, reject) => {
    const sql = `select *, ${formatDate}, ${formatTime} from hours where user_id =? and date >= CAST(? AS DATE) AND date <= CAST(? AS DATE);`;
    db.query(sql, [user_id, start_date, end_date], (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  });
}

/**
 * Set Hours: change the current hours for today
 * 
 * @param timein
 * @param mealout
 * @param mealin
 * @param timeout
 */
function updateHours(user_id, hours) {
  //edgecase: timeOut- must be after all, mealIn- must be after or at mealOut, mealOut must be after timeIn
  //query the databae to find where userID = currentUser and date = today

  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE hours SET clock_in = ?, meal_out = ?, meal_in = ?, clock_out = ?, total = ? WHERE user_id = ? AND date = ?
    `;
    db.query(sql, [hours.timein, hours.mealout, hours.mealin, hours.timeout, hours.total, user_id, hours.date], (err, result) => {
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
 * @param user_id 
 * @param hours
 */
function createHours(user_id, hours) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO hours (user_id, date, clock_in, clock_out, meal_in, meal_out, total) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    db.query(sql, [user_id, hours.date, hours.timein, hours.timeout, hours.mealin, hours.mealout, hours.total], (err, result) => {
      if (err) {
          reject(err);
      }
      resolve(result);
    })
  });
}

/**
 * searchHours: return all hours between specified dates for all specified users
 *
 * @param users
 * @param start_date
 * @param end_date
 */
function searchHours(users, start_date, end_date) {
    return new Promise((resolve, reject) => {
      let user_id = '';
      for(let i = 0; i < users.length; i++){
        if( i == users.length - 1 ){
          user_id = `${user_id}y.user_id = ${users[i].user_id} `;
        } else {
          user_id = `${user_id}y.user_id = ${users[i].user_id} OR `;
        }
      }

      const sql = `
        select y.user_id, name, hours_id, date, clock_in, clock_out, meal_in, meal_out, total, ${formatDate}, ${formatTime} from hours x inner join users y on x.user_id = y.user_id where (${user_id}) AND date >= CAST(? AS DATE) AND date <= CAST(? AS DATE) ORDER BY name, date
      `;
      /*
      const sql = `
      SELECT  FROM users x, hours y
      WHERE x.user_id = y.user_id AND (x.name LIKE ? OR x.email LIKE ?) AND y.date >= CAST(? AS DATE) AND y.date <= CAST(? AS DATE) ORDER BY x.name, y.date;
      `;
      */

      db.query(sql, [start_date, end_date], (err, result) => {
          if (err) {
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
function deleteHours(hour_id) {
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
        });
    });
}

module.exports = {
    getHours,
    updateHours,
    createHours,
    deleteHours,
    searchHours,
    getTodaysHours,
}
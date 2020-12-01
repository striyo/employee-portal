/*
  For all database functions, the body of the function should be inside
  a new Promise that is returned.
  Need this for async functions.

  If there is an error, reject
  If success, resolve
*/
const db = require('./db.js');

function createUser(name, phone, email, password, rate, salaried, is_admin,is_active){
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO users (
        name, phone, email, password, rate, salaried, is_admin, is_active
      ) VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(sql,[name, phone, email, password, rate, salaried, is_admin,is_active], (err, result) => {
      if( err ){
        reject(err);
      }
      resolve(result);
    })
  })
}

function getAllUser(){
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM users
    `;

    db.query(sql, (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

function getAllHourlyUser(){
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM users WHERE salaried = 0
    `;

    db.query(sql, (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

function getUser(email){
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM users WHERE email = ?
    `;

    db.query(sql, [email], (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}


function updatePassword(user_id, password){
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE users SET password = ? WHERE user_id = ?
    `;

    db.query(sql, [password, user_id], (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

function searchUsers(search){
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT user_id, name, email, phone, profile_picture, rate, salaried, is_admin, is_active FROM users WHERE name LIKE ? OR email like ?
    `;

    db.query(sql, [`%${search}%`, `%${search}%`], (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

function updateUser(user){
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE users SET name = ?, email = ?, phone = ?, salaried = ?, is_admin = ?, is_active = ?, rate = ? WHERE user_id = ?
    `;

    db.query(sql, [user.name, user.email, user.phone, user.salaried, user.is_admin, user.is_active, user.rate, user.user_id], (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

function updateUserPicture(user_id, picture){
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE users SET profile_picture = ? WHERE user_id = ?
    `;

    db.query(sql, [picture, user_id], (err, result) => {
      if( err ){
        reject(err);
      }

      resolve(result);
    })
  })
}

module.exports = {
  getUser,
  createUser,
  getAllUser,
  updatePassword,
  searchUsers,
  updateUser,
  getAllHourlyUser,
  updateUserPicture,
}
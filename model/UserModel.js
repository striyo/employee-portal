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

module.exports = {
  getUser,
  createUser,
  getAllUser,
}
const db = require('./db.js');

function createResetToken(user_id, token, expiration) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO pwdReset(user_id, token, expiration) VALUES (?,?,?)
    `;

    db.query(sql, [user_id, token, expiration], (err, result) => {
      if(err){
        reject(err);
      }

      resolve(result);
    })
  });
}

function validateToken(user_id, token) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM pwdReset WHERE user_id = ? AND token = ? AND expiration >= NOW()
    `;

    db.query(sql, [user_id, token], (err, result) => {
      if(err){
        reject(err);
      }

      resolve(result);
    })
  });
}

function deleteToken(reset_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM pwdReset WHERE reset_id = ?
    `;

    db.query(sql, [reset_id], (err, result) => {
      if(err){
        reject(err);
      }

      resolve(result);
    })
  });
}

module.exports = {
  createResetToken,
  validateToken,
  deleteToken
};
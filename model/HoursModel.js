const db = require('./db.js');

function logHours(user_id, token) {
    return new Promise((resolve, reject) => {
        const sql = `
      INSERT INTO pwdReset(user_id, token, expiration) VALUES (?,?,DATE_ADD(NOW(), INTERVAL 1 HOUR))
    `;

        db.query(sql, [user_id, token], (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    });
}

function getResetToken(user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT * FROM pwdReset WHERE user_id = ? AND expiration >= NOW()
    `;

        db.query(sql, [user_id], (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    });
}

function deleteResetToken(reset_id) {
    return new Promise((resolve, reject) => {
        const sql = `
      DELETE FROM pwdReset WHERE reset_id = ?
    `;

        db.query(sql, [reset_id], (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    });
}

module.exports = {
};
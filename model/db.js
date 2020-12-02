const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'taro-tech-db-do-user-8281352-0.b.db.ondigitalocean.com',
  user: 'emerald',
  password: 'y20fx7nomdmiao2b',
  dateStrings: true,
  port: 25060,
  database: 'portal'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected');
});

module.exports = db;
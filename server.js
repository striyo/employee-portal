// Dependencies
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// variables
const port = 3000 || process.env.PORT;
const app = express();

const dbPass = '';
const sessionStoreOptions = {
  host: 'localhost',
  user: 'totee',
  password: dbPass,
  database: 'portal',
}
/*
const sessionStoreOptions = {
  host: 'taro-tech-db-do-user-8281352-0.b.db.ondigitalocean.com',
  user: 'emerald',
  password: 'y20fx7nomdmiao2b',
  port: 25060,
  database: 'portal'
}
*/
let sessionStore = new MySQLStore(sessionStoreOptions);

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: "asjdflkajsdlk;fjas",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Routes
app.use('/api/users', require('./route/users.js'));
app.use('/api/hours', require('./route/hours.js'));
app.use('/api/events', require('./route/events.js'));
app.use('/api/resources', require('./route/resources.js'));
app.use('/api/timesheets', require('./route/timesheets.js'));
app.use('/api/todos', require('./route/todos.js'));
app.use(express.static('public'));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
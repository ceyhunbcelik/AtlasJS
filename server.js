const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');
const db = require('./Helpers/MySQL');

const app = express();

// Server
const PORT = 8080;
app.listen(PORT, () => console.log('Server running on: ', PORT));

// MySQL
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');

  // Routers
  app.use('/', require('./Routers/IndexRouter'));
});

// Session
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 2
  }
}));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Public Folder
app.use('/Public', express.static(path.join(__dirname, 'public')));
app.use('/face-api-models', express.static(path.join(__dirname, 'public/face-api-models')));

// Pug - View Engine
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');
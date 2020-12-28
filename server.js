const express = require('express');
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

// Public Folder
app.use('/Public', express.static(path.join(__dirname, 'public')));
app.use('/face-api-models', express.static(path.join(__dirname, 'public/face-api-models')));

// Pug - View Engine
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');
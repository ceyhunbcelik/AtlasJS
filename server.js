const express = require('express');
const path = require('path');
const PORT = 8080;

const app = express();

// Public Folder
app.use('/Public', express.static(path.join(__dirname, 'public')));
app.use('/face-api-models', express.static(path.join(__dirname, 'public/face-api-models')));

// Pug - View Engine
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

// Routers
app.use('/', require('./Routers/IndexRouter'));

app.listen(PORT, () => console.log('Server running on: ', PORT));
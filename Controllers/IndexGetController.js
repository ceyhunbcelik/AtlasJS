const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.render('Pages/index.pug')
});

module.exports = app;
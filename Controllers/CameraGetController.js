const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.render('Pages/camera.pug');
})

module.exports = app;
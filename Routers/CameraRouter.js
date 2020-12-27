const express = require('express');

const router = express.Router();

router.get('/', require('../Controllers/CameraGetController'));

module.exports = router;
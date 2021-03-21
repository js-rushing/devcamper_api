"use strict";

var express = require('express');

var _require = require('../controllers/auth'),
    register = _require.register,
    login = _require.login,
    getMe = _require.getMe;

var router = express.Router();

var _require2 = require('../middleware/auth'),
    protect = _require2.protect;

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
module.exports = router;
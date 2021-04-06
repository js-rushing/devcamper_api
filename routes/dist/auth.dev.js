"use strict";

var express = require('express');

var _require = require('../controllers/auth'),
    register = _require.register,
    login = _require.login,
    getMe = _require.getMe,
    forgotPassword = _require.forgotPassword,
    resetPassword = _require.resetPassword,
    updateDetails = _require.updateDetails,
    updatePassword = _require.updatePassword;

var router = express.Router();

var _require2 = require('../middleware/auth'),
    protect = _require2.protect;

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
module.exports = router;
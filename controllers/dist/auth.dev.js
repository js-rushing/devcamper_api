"use strict";

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var User = require('../models/User'); // @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public


exports.register = asyncHandler(function _callee(req, res, next) {
  var _req$body, name, email, password, role, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role; // Create user

          _context.next = 3;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: password,
            role: role
          }));

        case 3:
          user = _context.sent;
          sendTokenResponse(user, 200, res);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(function _callee2(req, res, next) {
  var _req$body2, email, password, user, isMatch;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Validate email & password

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse('Please provide an email and password', 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse('Invalid credentials', 401)));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 10:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse('Invalid credentials', 401)));

        case 13:
          sendTokenResponse(user, 200, res);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Get token from model, create cookie and send response

var sendTokenResponse = function sendTokenResponse(user, statusCode, res) {
  // Create token
  var token = user.getSignedJwtToken();
  var options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }; // Sends the cookie via https when in production

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  } // I think this uses the cookie-parser dependency somehow
  //  the .cookie() part probably


  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token: token
  });
}; // @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private


exports.getMe = asyncHandler(function _callee3(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context3.sent;
          res.status(200).json({
            success: true,
            data: user
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
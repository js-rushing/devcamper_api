"use strict";

var crypto = require('crypto');

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var _require = require('../utils/sendEmail'),
    sendEmail = _require.sendEmail;

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
}); // @desc    Get current logged in user
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
}); // @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private

exports.updateDetails = asyncHandler(function _callee4(req, res, next) {
  var fieldsToUpdate, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            "new": true,
            runValidators: true
          }));

        case 3:
          user = _context4.sent;
          res.status(200).json({
            success: true,
            data: user
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private

exports.updatePassword = asyncHandler(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('+password'));

        case 2:
          user = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(user.matchPassword(req.body.currentPassword));

        case 5:
          if (_context5.sent) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse('Password is incorrect', 401)));

        case 7:
          user.password = req.body.newPassword;
          _context5.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          sendTokenResponse(user, 200, res);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public

exports.forgotPassword = asyncHandler(function _callee6(req, res, next) {
  var user, resetToken, resetURL, message;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context6.sent;

          if (user) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new ErrorResponse("There is no user with that email", 404)));

        case 5:
          // Get reset token
          resetToken = user.getResetPasswordToken();
          _context6.next = 8;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          // Create reset url
          resetURL = "".concat(req.protocol, "://").concat(req.get('host'), "/api/v1/auth/resetpassword/").concat(resetToken);
          /* If you had a frontend application this would likely
           *  include a frontend link to reset but in this case
           *  we don't so we're just including this message
           */

          message = "You are receiving this email because you (or someone else) has requested the reset of a password.  Please make a PUT request to: \n\n ".concat(resetURL);
          _context6.prev = 10;
          _context6.next = 13;
          return regeneratorRuntime.awrap(sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message: message
          }));

        case 13:
          res.status(200).json({
            success: true,
            data: 'Email sent'
          });
          _context6.next = 24;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](10);
          console.log(_context6.t0);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context6.next = 23;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 23:
          return _context6.abrupt("return", next(new ErrorResponse('Email could not be sent', 500)));

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[10, 16]]);
}); // @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public

exports.resetPassword = asyncHandler(function _callee7(req, res, next) {
  var resetPasswordToken, user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          // Get hashed token
          resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            resetPasswordToken: resetPasswordToken,
            // $gt is greater than
            resetPasswordExpire: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context7.sent;

          if (user) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next(new ErrorResponse('Invalid token', 400)));

        case 6:
          // Set new password
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context7.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          sendTokenResponse(user, 200, res);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  });
});
/* HELPER FUNCTION
 *
 *
 */
// Get token from model, create cookie and send response

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
};
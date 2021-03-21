"use strict";

var jwt = require('jsonwebtoken');

var asyncHandler = require('./async');

var ErrorResponse = require('../utils/errorResponse');

var User = require('../models/User'); // Protect routes


exports.protect = asyncHandler(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // console.log(token)
          } //   else if (req.cookies.token) {
          //     token = req.cookies.token
          //   }
          // Make sure token exists


          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse('Not authorized to access this route', 401)));

        case 3:
          _context.prev = 3;
          // Verify token
          decoded = jwt.verify(token, process.env.JWT_SECRET); // console.log(decoded)

          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 7:
          req.user = _context.sent;
          next();
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", next(new ErrorResponse('Not authorized to access this route', 401)));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 11]]);
}); // Grant access to specific roles

exports.authorize = function () {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse("User role '".concat(req.user.role, "' is not authorized to access this route."), 403));
    }

    next();
  };
};
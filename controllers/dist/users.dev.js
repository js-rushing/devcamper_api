"use strict";

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var User = require('../models/User'); // @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin


exports.getUsers = asyncHandler(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.status(200).json(res.advancedResults);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin

exports.getUser = asyncHandler(function _callee2(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context2.sent;
          res.status(200).json({
            success: true,
            data: user
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin

exports.createUser = asyncHandler(function _callee3(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.create(req.body));

        case 2:
          user = _context3.sent;
          res.status(201).json({
            success: true,
            data: user
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(function _callee4(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          user = _context4.sent;
          res.status(200).json({
            success: true,
            data: user
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 2:
          user = _context5.sent;
          res.status(200).json({
            success: true,
            data: {}
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
"use strict";

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var Bootcamp = require('../models/Bootcamp'); // @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public


exports.getBootcamps = asyncHandler(function _callee(req, res, next) {
  var bootcamps;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.find());

        case 2:
          bootcamps = _context.sent;
          res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public

exports.getBootcamp = asyncHandler(function _callee2(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.id));

        case 2:
          bootcamp = _context2.sent;

          if (bootcamp) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: bootcamp
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private

exports.createBootcamp = asyncHandler(function _callee3(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.create(req.body));

        case 2:
          bootcamp = _context3.sent;
          res.status(201).json({
            success: true,
            data: bootcamp
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = asyncHandler(function _callee4(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 2:
          bootcamp = _context4.sent;

          if (bootcamp) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: bootcamp
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = asyncHandler(function _callee5(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findByIdAndDelete(req.params.id));

        case 2:
          bootcamp = _context5.sent;

          if (bootcamp) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: {}
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
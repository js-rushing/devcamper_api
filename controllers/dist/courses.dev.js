"use strict";

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var Course = require('../models/Course');

var Bootcamp = require('../models/Bootcamp'); // @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public


exports.getCourses = asyncHandler(function _callee(req, res, next) {
  var courses;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.params.bootcampId) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Course.find({
            bootcamp: req.params.bootcampId
          }));

        case 3:
          courses = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
          }));

        case 7:
          res.status(200).json(res.advancedResults);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public

exports.getCourse = asyncHandler(function _callee2(req, res, next) {
  var course;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id).populate({
            path: 'bootcamp',
            select: 'name description'
          }));

        case 2:
          course = _context2.sent;

          if (course) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("No course with the id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: course
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    Add course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private

exports.addCourse = asyncHandler(function _callee3(req, res, next) {
  var bootcamp, course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // pulls the bootcamp ID from URL, finds it in DB, and
          //  adds it to req.body for the Course model
          req.body.bootcamp = req.params.bootcampId;
          req.body.user = req.user.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.bootcampId));

        case 4:
          bootcamp = _context3.sent;

          if (bootcamp) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(new ErrorResponse("No bootcamp with the id of ".concat(req.params.bootcampId), 404)));

        case 7:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", next(new ErrorResponse("User ".concat(req.user.id, " is not authorized to add a course to bootcamp ").concat(bootcamp._id), 401)));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(Course.create(req.body));

        case 11:
          course = _context3.sent;
          res.status(200).json({
            success: true,
            data: course
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private

exports.updateCourse = asyncHandler(function _callee4(req, res, next) {
  var course;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context4.sent;

          if (course) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("No course with the id of ".concat(req.params.idd), 404)));

        case 5:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("User ".concat(req.user.id, " is not authorized to update course ").concat(course._id), 401)));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(Course.findByIdAndUpdate(req.params.id, req.body, {
            // new sends back the updated course
            "new": true,
            runValidators: true
          }));

        case 9:
          course = _context4.sent;
          res.status(200).json({
            success: true,
            data: course
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private

exports.deleteCourse = asyncHandler(function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context5.sent;

          if (course) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("No course with the id of ".concat(req.params.idd), 404)));

        case 5:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("User ".concat(req.user.id, " is not authorized to delete course ").concat(course._id), 401)));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(course.remove());

        case 9:
          res.status(200).json({
            success: true,
            data: {}
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
});
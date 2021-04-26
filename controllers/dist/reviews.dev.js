"use strict";

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var Review = require('../models/Review');

var Bootcamp = require('../models/Bootcamp'); // @desc    Get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public


exports.getReviews = asyncHandler(function _callee(req, res, next) {
  var reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.params.bootcampId) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Review.find({
            bootcamp: req.params.bootcampId
          }));

        case 3:
          reviews = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
          }));

        case 7:
          res.status(200).json(res.advancedResults);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public

exports.getReview = asyncHandler(function _callee2(req, res, next) {
  var review;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Review.findById(req.params.id).populate({
            path: 'bootcamp',
            select: 'name description'
          }));

        case 2:
          review = _context2.sent;

          if (review) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("No review found with the id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: review
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    Add review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private

exports.addReview = asyncHandler(function _callee3(req, res, next) {
  var bootcamp, review;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
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
          _context3.next = 9;
          return regeneratorRuntime.awrap(Review.create(req.body));

        case 9:
          review = _context3.sent;
          res.status(201).json({
            success: true,
            data: review
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private

exports.updateReview = asyncHandler(function _callee4(req, res, next) {
  var review;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Review.findById(req.params.id));

        case 2:
          review = _context4.sent;

          if (review) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("No review with the id of ".concat(req.params.id), 404)));

        case 5:
          if (!(review.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("Not authorized to update review", 401)));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(Review.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 9:
          review = _context4.sent;
          res.status(200).json({
            success: true,
            data: review
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private

exports.deleteReview = asyncHandler(function _callee5(req, res, next) {
  var review;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Review.findById(req.params.id));

        case 2:
          review = _context5.sent;

          if (review) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("No review with the id of ".concat(req.params.id), 404)));

        case 5:
          if (!(review.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("Not authorized to update review", 401)));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(review.remove());

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
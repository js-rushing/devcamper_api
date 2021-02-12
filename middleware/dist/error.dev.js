"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorResponse = require('../utils/errorResponse');

var errorHandler = function errorHandler(err, req, res, next) {
  var error = _objectSpread({}, err);

  error.message = err.message; // Log to console for dev

  console.log(err); // console.log(err.stack.red)
  // Mongoose bad ObjectId

  if (err.name === 'CastError') {
    var message = "Bootcamp not found with id of ".concat(err.value);
    error = new ErrorResponse(message, 404);
  } // Mongoose duplicate key


  if (err.code === 11000) {
    var _message = 'Duplicate field value entered';
    error = new ErrorResponse(_message, 400);
  } // Mongoose validation error


  if (err.name === 'ValidationError') {
    var _message2 = Object.values(err.errors).map(function (val) {
      return val.message;
    });

    error = new ErrorResponse(_message2, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
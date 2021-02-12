"use strict";

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan');

var colors = require('colors');

var errorHandler = require('./middleware/error');

var connectDB = require('./config/db'); // Load env vars


dotenv.config({
  path: './config/config.env'
}); // Connect to database

connectDB(); // Route files

var bootcamps = require('./routes/bootcamps');

var app = express(); // Body parser

app.use(express.json()); // Dev logging middleware 'morgan'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Mount routers


app.use('/api/v1/bootcamps', bootcamps); // Error Handler must be after Mount routers or won't catch

app.use(errorHandler);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " on ").concat(PORT).yellow.bold)); // Handle unhandled promise rejections

process.on('unhandledRejection', function (err, promise) {
  console.log("Error: ".concat(err.message).red); // Close server & exit process with failure

  server.close(function () {
    return process.exit(1);
  });
});
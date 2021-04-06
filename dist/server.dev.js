"use strict";

var path = require('path');

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan');

var colors = require('colors');

var fileupload = require('express-fileupload');

var cookieParser = require('cookie-parser');

var errorHandler = require('./middleware/error');

var connectDB = require('./config/db'); // Load env vars


dotenv.config({
  path: './config/config.env'
}); // Connect to database

connectDB(); // Route files

var bootcamps = require('./routes/bootcamps');

var courses = require('./routes/courses');

var auth = require('./routes/auth');

var users = require('./routes/users');

var app = express(); // Body parser

app.use(express.json()); // Cookie parser

app.use(cookieParser()); // Dev logging middleware 'morgan'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // File uploading


app.use(fileupload()); // Set static folder

app.use(express["static"](path.join(__dirname, 'public'))); // Mount routers

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users); // Error Handler must be after Mount routers or won't catch

app.use(errorHandler);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " on ").concat(PORT).yellow.bold)); // Handle unhandled promise rejections

process.on('unhandledRejection', function (err, promise) {
  console.log("Error: ".concat(err.message).red); // Close server & exit process with failure

  server.close(function () {
    return process.exit(1);
  });
});
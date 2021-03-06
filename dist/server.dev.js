"use strict";

var path = require('path');

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan');

var colors = require('colors');

var fileupload = require('express-fileupload');

var cookieParser = require('cookie-parser');

var mongoSanitize = require('express-mongo-sanitize');

var helmet = require('helmet');

var xssClean = require('xss-clean');

var rateLimit = require('express-rate-limit');

var hpp = require('hpp');

var cors = require('cors');

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

var reviews = require('./routes/reviews');

var app = express(); // Body parser

app.use(express.json()); // Cookie parser

app.use(cookieParser()); // Dev logging middleware 'morgan'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // File uploading


app.use(fileupload()); // Sanitize data

app.use(mongoSanitize()); // Set security headers

app.use(helmet()); // Prevent cross site scripting XSS attacks

app.use(xssClean()); // Request rate limiting

var limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  // 10 mins,
  max: 100
});
app.use(limiter); // Prevent http param pollution

app.use(hpp()); // Enable CORS

app.use(cors()); // Set static folder

app.use(express["static"](path.join(__dirname, 'public'))); // Mount routers

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews); // Error Handler must be after Mount routers or won't catch

app.use(errorHandler);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " on ").concat(PORT).yellow.bold)); // Handle unhandled promise rejections

process.on('unhandledRejection', function (err, promise) {
  console.log("Error: ".concat(err.message).red); // Close server & exit process with failure

  server.close(function () {
    return process.exit(1);
  });
});
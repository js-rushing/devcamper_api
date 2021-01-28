"use strict";

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan'); // Route files


var bootcamps = require('./routes/bootcamps'); // Load env vars


dotenv.config({
  path: './config/config.env'
});
var app = express(); // Dev logging middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Mount routers


app.use('/api/v1/bootcamps', bootcamps);
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " on ").concat(PORT)));
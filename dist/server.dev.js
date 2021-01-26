"use strict";

var express = require('express');

var dotenv = require('dotenv'); // Load env vars


dotenv.config({
  path: './config/config.env'
});
var app = express();
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " on ").concat(PORT)));
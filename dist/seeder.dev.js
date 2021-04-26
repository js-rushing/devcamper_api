"use strict";

var fs = require('fs');

var mongoose = require('mongoose');

var colors = require('colors');

var dotenv = require('dotenv'); // Load env vars


dotenv.config({
  path: './config/config.env'
}); // Load models

var Bootcamp = require('./models/Bootcamp');

var Course = require('./models/Course');

var User = require('./models/User');

var Review = require('./models/Review'); // Connect to DB


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}); // Read JSON files

var bootcamps = JSON.parse(fs.readFileSync("".concat(__dirname, "/_data/bootcamps.json"), 'utf-8'));
var courses = JSON.parse(fs.readFileSync("".concat(__dirname, "/_data/courses.json"), 'utf-8'));
var users = JSON.parse(fs.readFileSync("".concat(__dirname, "/_data/users.json"), 'utf-8'));
var reviews = JSON.parse(fs.readFileSync("".concat(__dirname, "/_data/reviews.json"), 'utf-8')); // Import into DB

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Bootcamp.create(bootcamps));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Course.create(courses));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(User.create(users));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Review.create(reviews));

        case 9:
          console.log('Data Imported...'.green.inverse);
          process.exit();
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // Delete data


var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Bootcamp.deleteMany());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Course.deleteMany());

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.deleteMany());

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(Review.deleteMany());

        case 9:
          console.log('Data Destroyed...'.red.inverse);
          process.exit();
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
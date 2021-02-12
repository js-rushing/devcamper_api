"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          }));

        case 2:
          conn = _context.sent;
          console.log("MongoDB Connected: ".concat(conn.connection.host).cyan.underline.bold);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = connectDB;
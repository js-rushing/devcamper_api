"use strict";

// crypto is a core module
var crypto = require('crypto');

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  role: {
    type: String,
    "enum": ['user', 'publisher'],
    "default": 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    // setting select to false disallows the api showing password
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    "default": Date.now
  }
}); // Encrypt password using bcrypt

UserSchema.pre('save', function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /* this if statement was added to avoid an error during
           *  the saving of the resetPasswordToken
           *  this middleware was triggering an error
           *  "Illegal arguments: undefined, string"
           */
          if (!this.isModified('password')) {
            next();
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 6:
          this.password = _context.sent;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // Sign JWT and return

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({
    id: this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}; // Match user entered password to hashed password in database


UserSchema.methods.matchPassword = function _callee2(enteredPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(enteredPassword, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; // Generate and hash password token


UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  // randomBytes(number of bytes), returns buffer
  var resetToken = crypto.randomBytes(20).toString('hex');
  console.log(resetToken); // Hash token and set to resetPasswordToken field

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Set expire (ten minutes from now)

  this.resetPasswordExpire = Date.now() + 10 * 60 * 100;
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
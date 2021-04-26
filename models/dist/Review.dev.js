"use strict";

var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 250
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}); // Limit 1 review per user per bootcampAdd review

ReviewSchema.index({
  bootcamp: 1,
  user: 1
}, {
  unique: true
}); // Static method to get avg review rating

ReviewSchema.statics.getAverageRating = function _callee(bootcampId) {
  var obj;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(this.aggregate([{
            $match: {
              bootcamp: bootcampId
            }
          }, {
            $group: {
              _id: '$bootcamp',
              averageRating: {
                $avg: '$rating'
              }
            }
          }]));

        case 2:
          obj = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
          }));

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[3, 8]]);
}; // Call getAverageRating after save
//  .post() runs after save


ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
}); // Call getAverageRating before remove
//  .post() runs before remove

ReviewSchema.post('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
});
module.exports = mongoose.model('Review', ReviewSchema);
"use strict";

var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add duration of course in weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill requirement'],
    "enum": ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    "default": false
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
}); // Static method to get avg of course tuitions

CourseSchema.statics.getAverageCost = function _callee(bootcampId) {
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
              averageCost: {
                $avg: '$tuition'
              }
            }
          }]));

        case 2:
          obj = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: obj.length > 0 ? Math.ceil(obj[0].averageCost / 10) * 10 : undefined
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
}; // Call getAverageCost after save
//  .post() runs after save


CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
}); // Call getAverageCost before remove
//  .post() runs before remove

CourseSchema.post('remove', function () {
  this.constructor.getAverageCost(this.bootcamp);
});
module.exports = mongoose.model('Course', CourseSchema);
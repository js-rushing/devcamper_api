"use strict";

var mongoose = require('mongoose');

var slugify = require('slugify');

var geocoder = require('../utils/geocoder');

var BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Max length 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Max length 500 characters']
  },
  website: {
    type: String,
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:&._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a valid URL with HTTP or HTTPS']
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number no longer than 20 characters']
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      "enum": ['Point'] // required: true,

    },
    coordinates: {
      type: [Number],
      // required: true,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    // Array of Strings
    type: [String],
    required: true,
    "enum": ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must not be more than 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    "default": 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    "default": false
  },
  jobAssistance: {
    type: Boolean,
    "default": false
  },
  jobGuarantee: {
    type: Boolean,
    "default": false
  },
  acceptGi: {
    type: Boolean,
    "default": false
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
}); // Create bootcamp slug from the name
// Don't use arrow function here because arrow functions
// handle the 'this' differently

BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    replacement: '_'
  });
  next();
}); // Geocode & create location field

BootcampSchema.pre('save', function _callee(next) {
  var loc;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(geocoder.geocode(this.address));

        case 2:
          loc = _context.sent;
          this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].stateCode,
            zipcode: loc[0].zipcode,
            country: loc[0].countryCode
          }; // Do not save address in DB

          this.address = undefined;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
module.exports = mongoose.model('Bootcamp', BootcampSchema);
"use strict";

var path = require('path');

var ErrorResponse = require('../utils/errorResponse');

var asyncHandler = require('../middleware/async');

var geocoder = require('../utils/geocoder');

var Bootcamp = require('../models/Bootcamp');

var _require = require('../models/Bootcamp'),
    findByIdAndUpdate = _require.findByIdAndUpdate; // @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public


exports.getBootcamps = asyncHandler(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.status(200).json(res.advancedResults);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public

exports.getBootcamp = asyncHandler(function _callee2(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.id));

        case 2:
          bootcamp = _context2.sent;

          if (bootcamp) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            data: bootcamp
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private

exports.createBootcamp = asyncHandler(function _callee3(req, res, next) {
  var publishedBootcamp, bootcamp;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Add user to request body
          req.body.user = req.user.id; // Check for published bootcamp

          _context3.next = 3;
          return regeneratorRuntime.awrap(Bootcamp.findOne({
            user: req.user.id
          }));

        case 3:
          publishedBootcamp = _context3.sent;

          if (!(publishedBootcamp && req.user.role != 'admin')) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new ErrorResponse("The user with ID ".concat(req.user.id, " has already published a bootcamp"), 400)));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Bootcamp.create(req.body));

        case 8:
          bootcamp = _context3.sent;
          res.status(201).json({
            success: true,
            data: bootcamp
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private

exports.updateBootcamp = asyncHandler(function _callee4(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.id));

        case 2:
          bootcamp = _context4.sent;

          if (bootcamp) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("User ".concat(req.params.id, " is not authorized to update this bootcamp"), 401)));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 9:
          bootcamp = _context4.sent;
          res.status(200).json({
            success: true,
            data: bootcamp
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private

exports.deleteBootcamp = asyncHandler(function _callee5(req, res, next) {
  var bootcamp;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.id));

        case 2:
          bootcamp = _context5.sent;

          if (bootcamp) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("User ".concat(req.params.id, " is not authorized to delete this bootcamp"), 401)));

        case 7:
          // using the remove() method rather than findByIdAndDelete()
          //  allows of the use of the middleware in the Bootcamp model
          //  which cascade deletes all of the associated courses and other
          //  info along with the bootcamp
          bootcamp.remove();
          res.status(200).json({
            success: true,
            data: {}
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // @desc        Get bootcamps within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private

exports.getBootcampsInRadius = asyncHandler(function _callee6(req, res, next) {
  var _req$params, zipcode, distance, loc, lat, lng, radius, bootcamps;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$params = req.params, zipcode = _req$params.zipcode, distance = _req$params.distance; // Get lat/lng from geocoder

          _context6.next = 3;
          return regeneratorRuntime.awrap(geocoder.geocode(zipcode));

        case 3:
          loc = _context6.sent;
          lat = loc[0].latitude;
          lng = loc[0].longitude; // Calc radius using radians
          // Divide distance by Earth's radius
          // Earth's radius = 3,963 mi / 6,378 km

          radius = distance / 3963;
          _context6.next = 9;
          return regeneratorRuntime.awrap(Bootcamp.find({
            location: {
              $geoWithin: {
                $centerSphere: [[lng, lat], radius]
              }
            }
          }));

        case 9:
          bootcamps = _context6.sent;
          res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // @desc        Upload photo for bootcamp
// @route       DELETE /api/v1/bootcamps/:id/photo
// @access      Private

exports.bootcampPhotoUpload = asyncHandler(function _callee8(req, res, next) {
  var bootcamp, file;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Bootcamp.findById(req.params.id));

        case 2:
          bootcamp = _context8.sent;

          if (bootcamp) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", next(new ErrorResponse("Bootcamp not found with id of ".concat(req.params.id), 404)));

        case 5:
          if (!(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", next(new ErrorResponse("User ".concat(req.params.id, " is not authorized to update this bootcamp"), 401)));

        case 7:
          if (req.files) {
            _context8.next = 9;
            break;
          }

          return _context8.abrupt("return", next(new ErrorResponse("Please upload a file", 400)));

        case 9:
          file = req.files.file; // Make sure the image is a photo

          if (file.mimetype.startsWith('image')) {
            _context8.next = 12;
            break;
          }

          return _context8.abrupt("return", next(new ErrorResponse("Please upload an image file", 400)));

        case 12:
          if (!(file.size > process.env.MAX_FILE_UPLOAD)) {
            _context8.next = 14;
            break;
          }

          return _context8.abrupt("return", next(new ErrorResponse("Image file size limit exceeded", 400)));

        case 14:
          // Custom file name to avoid overwriting
          file.name = "photo_".concat(bootcamp._id).concat(path.parse(file.name).ext); // Upload file to file system

          file.mv("".concat(process.env.FILE_UPLOAD_PATH, "/").concat(file.name), function _callee7(err) {
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!err) {
                      _context7.next = 3;
                      break;
                    }

                    console.error(err);
                    return _context7.abrupt("return", next(new ErrorResponse("Problem uploading file", 500)));

                  case 3:
                    _context7.next = 5;
                    return regeneratorRuntime.awrap(Bootcamp.findByIdAndUpdate(req.params.id, {
                      photo: file.name
                    }));

                  case 5:
                    res.status(200).json({
                      success: true,
                      data: file.name
                    });

                  case 6:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  });
});
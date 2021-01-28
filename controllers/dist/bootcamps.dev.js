"use strict";

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = function (req, res, next) {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps'
  });
}; // @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public


exports.getBootcamp = function (req, res, next) {
  res.status(200).json({
    success: true,
    msg: "Show bootcamp ".concat(req.params.id)
  });
}; // @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private


exports.createBootcamp = function (req, res, next) {
  res.status(200).json({
    success: true,
    msg: 'Create new bootcamp'
  });
}; // @desc        Update bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private


exports.updateBootcamp = function (req, res, next) {
  res.status(200).json({
    success: true,
    msg: "Update bootcamp ".concat(req.params.id)
  });
}; // @desc        Delete bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private


exports.deleteBootcamp = function (req, res, next) {
  res.status(200).json({
    success: true,
    msg: "Delete bootcamp ".concat(req.params.id)
  });
};
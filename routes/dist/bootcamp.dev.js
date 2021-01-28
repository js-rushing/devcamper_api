"use strict";

var express = require('express');

var router = express.Router();
router.get('/api/v1/bootcamps', function (req, res) {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps'
  });
});
router.get('/api/v1/bootcamps/:id', function (req, res) {
  res.status(200).json({
    success: true,
    msg: "Get bootcamp ".concat(req.params.id)
  });
});
router.post('/api/v1/bootcamps', function (req, res) {
  res.status(200).json({
    success: true,
    msg: 'Create new bootcamp'
  });
});
router.put('/api/v1/bootcamps/:id', function (req, res) {
  res.status(200).json({
    success: true,
    msg: "Update bootcamp ".concat(req.params.id)
  });
});
router["delete"]('/api/v1/bootcamps/:id', function (req, res) {
  res.status(200).json({
    success: true,
    msg: "Delete bootcamp ".concat(req.params.id)
  });
});
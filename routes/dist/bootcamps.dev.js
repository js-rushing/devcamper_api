"use strict";

var express = require('express');

var _require = require('../controllers/bootcamps'),
    getBootcamps = _require.getBootcamps,
    getBootcamp = _require.getBootcamp,
    createBootcamp = _require.createBootcamp,
    updateBootcamp = _require.updateBootcamp,
    deleteBootcamp = _require.deleteBootcamp,
    getBootcampsInRadius = _require.getBootcampsInRadius,
    bootcampPhotoUpload = _require.bootcampPhotoUpload;

var Bootcamp = require('../models/Bootcamp'); // Include other resource routers


var courseRouter = require('./courses');

var router = express.Router(); // Bring in advancedResults middleware

var advancedResults = require('../middleware/advancedResults'); // Auth middleware
//  simply add 'protect' to arguments where
//  the user must be logged in


var _require2 = require('../middleware/auth'),
    protect = _require2.protect,
    authorize = _require2.authorize; // Reroute into other resource routers


router.use('/:bootcampId/courses', courseRouter); // Here begins the bootcamps router

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius); // File upload

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);
router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);
router.route('/:id').get(getBootcamp).put(protect, authorize('publisher', 'admin'), updateBootcamp)["delete"](protect, authorize('publisher', 'admin'), deleteBootcamp);
module.exports = router;
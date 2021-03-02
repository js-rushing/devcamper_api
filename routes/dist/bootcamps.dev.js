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

var Bootcamp = require('../models/Bootcamp'); // Bring in advancedResults middleware


var advancedResults = require('../middleware/advancedResults'); // Include other resource routers


var courseRouter = require('./courses');

var router = express.Router(); // Reroute into other resource routers

router.use('/:bootcampId/courses', courseRouter); // Here begins the bootcamps router

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius); // File upload

router.route('/:id/photo').put(bootcampPhotoUpload);
router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp)["delete"](deleteBootcamp);
module.exports = router;
"use strict";

var express = require('express');

var _require = require('../controllers/courses'),
    getCourses = _require.getCourses,
    getCourse = _require.getCourse,
    addCourse = _require.addCourse,
    updateCourse = _require.updateCourse,
    deleteCourse = _require.deleteCourse;

var Course = require('../models/Course'); // mergeParams must be included here in order to allow the reroute
//  from the bootcamps router
//  because we're merging the URL params


var router = express.Router({
  mergeParams: true
});

var advancedResults = require('../middleware/advancedResults'); // Auth middleware
//  simply add 'protect' to arguments where
//  the user must be logged in


var _require2 = require('../middleware/auth'),
    protect = _require2.protect,
    authorize = _require2.authorize;

router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select: 'name description'
}), getCourses).post(protect, authorize('publisher', 'admin'), addCourse);
router.route('/:id').get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse)["delete"](protect, authorize('publisher', 'admin'), deleteCourse);
module.exports = router;
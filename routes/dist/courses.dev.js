"use strict";

var express = require('express');

var _require = require('../controllers/courses'),
    getCourses = _require.getCourses,
    getCourse = _require.getCourse,
    addCourse = _require.addCourse,
    updateCourse = _require.updateCourse,
    deleteCourse = _require.deleteCourse;

var Course = require('../models/Course');

var advancedResults = require('../middleware/advancedResults'); // mergeParams must be included here in order to allow the reroute
//  from the bootcamps router
//  because we're merging the URL params


var router = express.Router({
  mergeParams: true
});
router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select: 'name description'
}), getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse)["delete"](deleteCourse);
module.exports = router;
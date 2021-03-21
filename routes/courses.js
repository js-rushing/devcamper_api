const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses')

const Course = require('../models/Course')

// mergeParams must be included here in order to allow the reroute
//  from the bootcamps router
//  because we're merging the URL params
const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')

// Auth middleware
//  simply add 'protect' to arguments where
//  the user must be logged in
const { protect, authorize } = require('../middleware/auth')

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse)
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router

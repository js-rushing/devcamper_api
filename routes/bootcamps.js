const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')

// Include other resource routers
const courseRouter = require('./courses')

const router = express.Router()

// Bring in advancedResults middleware
const advancedResults = require('../middleware/advancedResults')

// Auth middleware
//  simply add 'protect' to arguments where
//  the user must be logged in
const { protect, authorize } = require('../middleware/auth')

// Reroute into other resource routers
router.use('/:bootcampId/courses', courseRouter)

// Here begins the bootcamps router
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

// File upload
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router

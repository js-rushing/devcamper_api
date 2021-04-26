const express = require('express')
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews')

const Review = require('../models/Review')

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
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview)

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview)

module.exports = router

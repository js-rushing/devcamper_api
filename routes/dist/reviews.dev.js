"use strict";

var express = require('express');

var _require = require('../controllers/reviews'),
    getReviews = _require.getReviews,
    getReview = _require.getReview,
    addReview = _require.addReview,
    updateReview = _require.updateReview,
    deleteReview = _require.deleteReview;

var Review = require('../models/Review'); // mergeParams must be included here in order to allow the reroute
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

router.route('/').get(advancedResults(Review, {
  path: 'bootcamp',
  select: 'name description'
}), getReviews).post(protect, authorize('user', 'admin'), addReview);
router.route('/:id').get(getReview).put(protect, authorize('user', 'admin'), updateReview)["delete"](protect, authorize('user', 'admin'), deleteReview);
module.exports = router;
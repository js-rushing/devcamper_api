const express = require('express')
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/users')

const User = require('../models/User')

// mergeParams must be included here in order to allow the reroute
//  from the bootcamps router
//  because we're merging the URL params
const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')

// Auth middleware
//  simply add 'protect' to arguments where
//  the user must be logged in
const { protect, authorize } = require('../middleware/auth')

// Anything below this line will use this middleware
//  This way you don't have to put protect in each router.route line
//  Like in other route files
router.use(protect)
router.use(authorize('admin'))

router.route('/').get(advancedResults(User), getUsers).post(createUser)

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router

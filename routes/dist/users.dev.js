"use strict";

var express = require('express');

var _require = require('../controllers/users'),
    getUsers = _require.getUsers,
    getUser = _require.getUser,
    addUser = _require.addUser,
    updateUser = _require.updateUser,
    deleteUser = _require.deleteUser,
    createUser = _require.createUser;

var User = require('../models/User'); // mergeParams must be included here in order to allow the reroute
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
    authorize = _require2.authorize; // Anything below this line will use this middleware
//  This way you don't have to put protect in each router.route line
//  Like in other route files


router.use(protect);
router.use(authorize('admin'));
router.route('/').get(advancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser)["delete"](deleteUser);
module.exports = router;
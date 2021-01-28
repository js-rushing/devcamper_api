"use strict";

var express = require('express');

var _require = require('../controllers/bootcamps'),
    getBootcamps = _require.getBootcamps,
    getBootcamp = _require.getBootcamp,
    createBootcamp = _require.createBootcamp,
    updateBootcamp = _require.updateBootcamp,
    deleteBootcamp = _require.deleteBootcamp;

var router = express.Router();
router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp)["delete"](deleteBootcamp);
module.exports = router;
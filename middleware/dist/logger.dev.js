"use strict";

// @desc        Logs request to console
var logger = function logger(req, res, next) {
  console.log("".concat(req.method, " ").concat(req.protocol, "://").concat(req.get('host')).concat(req.originalUrl));
  next();
};

module.exports = logger;
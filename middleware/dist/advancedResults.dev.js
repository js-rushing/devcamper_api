"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var advancedResults = function advancedResults(model, populate) {
  return function _callee(req, res, next) {
    var query, reqQuery, removeFields, queryStr, fields, sortBy, page, limit, startIndex, endIndex, total, results, pagination;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Copy of req.query
            reqQuery = _objectSpread({}, req.query); // Fields to exclude

            removeFields = ['select', 'sort', 'page', 'limit']; // Loop over removeFields and delete them from reqQuery

            removeFields.forEach(function (param) {
              return delete reqQuery[param];
            }); // Create query string

            queryStr = JSON.stringify(reqQuery); // Create operators ($gt, $gte, etc)
            // \b()\b is the word boundary reqex
            // gt, gte, lt, lte, in are mongoDB operators
            // gt = >, gte = >=, lt = <, lte = <=
            // here we add a $ to the operator so it can be queried successfully

            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, function (match) {
              return "$".concat(match);
            }); // Finding resource

            query = model.find(JSON.parse(queryStr)); // Select Fields

            if (req.query.select) {
              fields = req.query.select.split(',').join(' ');
              query = query.select(fields);
            } // Sort


            if (req.query.sort) {
              sortBy = req.query.sort.split(',').join(' ');
              query = query.sort(sortBy);
            } else {
              query = query.sort('-createdAt');
            } // Pagination


            page = parseInt(req.query.page, 10) || 1;
            limit = parseInt(req.query.limit, 10) || 25;
            startIndex = (page - 1) * limit;
            endIndex = page * limit;
            _context.next = 14;
            return regeneratorRuntime.awrap(model.countDocuments());

          case 14:
            total = _context.sent;
            query = query.skip(startIndex).limit(limit);

            if (populate) {
              query = query.populate(populate);
            } // Executing query


            _context.next = 19;
            return regeneratorRuntime.awrap(query);

          case 19:
            results = _context.sent;
            // Pagination result
            pagination = {};

            if (endIndex < total) {
              pagination.next = {
                page: page + 1,
                limit: limit
              };
            }

            if (startIndex > 0) {
              pagination.prev = {
                page: page - 1,
                limit: limit
              };
            }

            res.advancedResults = {
              success: true,
              count: results.length,
              pagination: pagination,
              data: results
            };
            next();

          case 25:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

module.exports = advancedResults;
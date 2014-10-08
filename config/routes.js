var async = require('async'),
     path = require('path'),
       fs = require('fs')

/**
 * Controllers
 */

var main = require('../src/controllers/main')

/**
 * Route middlewares
 */

module.exports = function (app) {
  /* SPLASH ROUTES */
  app.get('/', main.index)
}

var express = require('express')
  , helpers = require('view-helpers')
  , pkg = require('../package.json')

module.exports = function (app, config) {

  app.set('showStackError', true)

  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  app.engine('.html', require('ejs').__express);
  app.use(express.favicon())
  app.use(express.static(config.root + '/public'))

  app.set('views', config.root + '/src/views')
  app.set('view engine', 'html')

  app.configure(function () {
    app.use(function (req, res, next) {
      res.locals.pkg = pkg
      next()
    })

    app.use(express.cookieParser())
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    app.use(helpers(pkg.name))
    app.use(app.router)
  })

  app.configure('local', function () {
    app.locals.pretty = true
  })
}
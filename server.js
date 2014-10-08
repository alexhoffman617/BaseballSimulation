var express = require('express')
  , fs = require('fs')

var env = 'development'
  , config = require('./config/config')[env]

console.log('Environment: ' + env)

var models_path = __dirname + '/src/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = express()
// express settings
require('./config/express')(app, config)
// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hii World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

// expose app
exports = module.exports = app

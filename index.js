'use strict'

// Loads environment variables
require('dotenv').load()

var express     = require('express')
var bodyParser  = require('body-parser')
var app         = express()
var router      = express.Router()

var routes      = require('./routes/main')(router)
var errHandler  = require('./misc/error-handler')
var formatter   = require('./misc/formatter')
var logger      = require('./misc/logger')

/**
 * Configure the middlewares
 */
app.use(bodyParser.urlencoded({ extended : true }))
app.use(errHandler)
app.use(formatter)
app.use(logger)

/**
 * Configure the app routes
 */
app.use('/', router)

// START THE SERVER
// =============================================================================
var server = app.listen(3000, () => {
  var host = server.address().address.replace(/::$/, 'localhost')
  var port = server.address().port

  console.log(`Server listening at http://${host}:${port}`)
})

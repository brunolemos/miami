'use strict'

var fs = require('fs')

/**
 * Enables all routes
 * @param express.Router router
 */
module.exports = (router) => {
  //all route files
  var files = fs.readdirSync('routes')

  for (var file of files) {
    if (file == 'main.js')
      continue

    require(`./${file}`)(router)
  }
}

var debug = require('debug')('delay:server')
var http = require('http')
var qs = require('querystring')
var url = require('url')

var port = process.env['PORT'] || 5005

var respond = function (req, res) {
  return function () {
    debug('...done')
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({ delay: req.delay }))
  }
}

var onRequest = function (req, res) {
  var delay = qs.parse(url.parse(req.url).query).delay || 1000
  req.delay = delay
  debug('Response in %s milliseconds...', delay)
  setTimeout(respond(req, res), delay)
}

var server = http.createServer(onRequest)
server.listen(port, function () {
  debug('Server is listening on port %s', port)
})

module.exports = server

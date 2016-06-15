var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')

app.listen(process.env.PORT || 8080)

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200)
    res.end(data)
  })
}
let player = require('./player')
io.on('connection', function (socket) {
  console.log('got connection')
  socket.emit('connected', {
    world: {
      name:'world',
      size: {
        x: 1920*16,
        y: 1920*16
      }
    },
    start: player.startingLocations.one
  })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
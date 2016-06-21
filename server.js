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
let players = {}
io.on('connection', function (socket) {
  console.log('got connection:', socket.id)
  socket.on('disconnect', function(data) {
    socket.broadcast.emit('deletePlayer', {
      id: socket.id
    })
    delete players[socket.id]
  })
  socket.emit('connected', {
    world: {
      name:'world',
      size: {
        x: 1920*16,
        y: 1920*16
      }
    },
    players: players,
    start: player.startingLocations.one
  })
  socket.on('created', function (data) {
    console.log('created:',data)
    socket.broadcast.emit('newPlayer', {
      id: socket.id,
      player: data.player
    })
    players[socket.id] = data
  })
  socket.on('move', function (data) {
    console.log('move', data)
    socket.emit('move', data)
    socket.broadcast.emit('opponentMove', {
      id: socket.id,
      move: data
    })
  })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
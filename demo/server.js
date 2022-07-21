const port = 8012;

const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

const onDisconnect = (reason) => {
  console.log('We lost connection,  reason -', reason);
}

const onConnection = socket => {
  console.log('New connection');

  const {room} = socket.handshake.query;

  socket.join(room);

  socket.on('message:created', message => {
    console.log('New message in ',room, ':', message);
    io.to(room).emit('message:created', message);
  })

  socket.on('disconnect', onDisconnect);
}

io.on('connection', onConnection);

server.listen(port, () => {
  console.log('connected');
})
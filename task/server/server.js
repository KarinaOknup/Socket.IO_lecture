const port = 3000;

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: '*',
});

const { memberMoveHandler, connectToRoomHandler } = require('./handlers');

io.on('connection', (socket) => {
  const {room, nickname} = socket.handshake.query;
  console.log('connection with room - ', room, ' nickname - ', nickname);

  socket.join(room);

  connectToRoomHandler(socket, io);
  memberMoveHandler(socket, io);
})

server.listen(port, () => console.log(`Server is listening on port ${port}.`));
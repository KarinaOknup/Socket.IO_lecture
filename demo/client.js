const port = 8012;
const room = process.argv[2] || 'bts';

const socket = require('socket.io-client')(`http://localhost:${port}`, {query:{room}});

socket.on('connect', onConnected);

socket.on('disconnect', onDisconnect);

function onConnected(){
  console.log('Connected to server');

  socket.emit('message:created', 'OMG message')
}

socket.on('message:created', (message) => {
  console.log('new message: ', message);
})

function onDisconnect(reason){
  console.log('Lost connection eith server, reason -', reason);
}
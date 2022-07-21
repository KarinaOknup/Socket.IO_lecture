const port = 3000;

const http = require('http');
const server = http.createServer();


// make import/connection to library and your port
// YOUR CODE // const io = require(...)(..., ...)
//

const { memberMoveHandler, connectToRoomHandler } = require('./handlers');

io.on('connection', (socket) => {
  // take room and nickname from sockets

  // join to room

  // use handlers from './handlers'
})

server.listen(port, () => console.log(`Server is listening on port ${port}.`));
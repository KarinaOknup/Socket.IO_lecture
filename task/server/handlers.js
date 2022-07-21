let connectedMembers = [];

exports.memberMoveHandler = (socket, io) => {
  const {room} = socket.handshake.query;
  socket.on('member:moveVertical', ({ nickname, value }) => {
    const indexMovingMember = connectedMembers.findIndex(member => member.nickname === nickname);

    connectedMembers[indexMovingMember].coordinates.top += value;
    io.to(room).emit('member:moved', { nickname, coordinates: connectedMembers[indexMovingMember].coordinates });
  })

  socket.on('member:moveHorizontal', ({ nickname, value }) => {
    const indexMovingMember = connectedMembers.findIndex(member => member.nickname === nickname);
    connectedMembers[indexMovingMember].coordinates.left += value;
    io.to(room).emit('member:moved', { nickname, coordinates: connectedMembers[indexMovingMember].coordinates });
  })
}

exports.connectToRoomHandler = (socket, io) => {
  function onConnect() {
    const {room, nickname} = socket.handshake.query;

    const coordinates = {
      left: 0,
      top: 0
    };

    connectedMembers.push({ room, nickname, coordinates });

    const list = connectedMembers.filter(member => member.room === room);

    io.to(room).emit('membersList:updated', list);
  }

  function onDisconnect() {
    const {room, nickname} = socket.handshake.query;

    connectedMembers = connectedMembers.filter( member => member.nickname !== nickname);
    const list = connectedMembers.filter(member => member.room !== room);

    io.to(room).emit('membersList:updated', list);
  }

  onConnect();
  
  socket.on('disconnect', () => {
    onDisconnect();
  })
}

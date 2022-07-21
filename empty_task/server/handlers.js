let connectedMembers = [];

exports.memberMoveHandler = (socket, io) => {
  // take room from socket

  // write handle of  'member:moveVertical'
  // here u mast find in connectedMembers your user and change his/her coordinates
  // then emit 'member:moved' to !!room!! with changed data


  // the same with 'member:moveHorizontal'
}

exports.connectToRoomHandler = (socket, io) => {
  function onConnect() {
    // take room from socket and nickname

    const coordinates = {
      left: 0,
      top: 0
    };

    connectedMembers.push({ room, nickname, coordinates });

    // make list of all members in !!room!!
    // send this list by emmiting 'membersList:updated'
  }

  function onDisconnect() {
    // write disconnect function where we will remove user from list
    // dont forget to inform about it all members of room
  }

  onConnect();
  
  socket.on('disconnect', () => {
    onDisconnect();
  })
}

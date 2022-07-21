const port = 3000;
// action buttons
const buttonUp = document.getElementById('buttonUp');
const buttonDown = document.getElementById('buttonDown');
const buttonRight = document.getElementById('buttonRight');
const buttonLeft = document.getElementById('buttonLeft');

const fieldOfMembers = document.getElementById('field');

const nickname = prompt('What\'s your name?');
const room = prompt('What\'s the room name you want to connect?');

const socket = io(`http://localhost:${port}`, {
  query: {
    room,
    nickname,
  },
});

socket.on('connect', () => {
  console.log('Connection');
});

socket.on('member:moved', ({ nickname, coordinates }) => {
  moveMember({nickname, coordinates});
});

socket.on('membersList:updated', (memberList) => onMembersListUpdate(memberList));


// Moving members

buttonUp.onclick = () => emitMoveMemberVertical(-10);
buttonDown.onclick = () => emitMoveMemberVertical(10);
buttonLeft.onclick = () => emitMoveMemberHorizontal(-10);
buttonRight.onclick = () => emitMoveMemberHorizontal(10);

function emitMoveMemberVertical(value){
  socket.emit('member:moveVertical', {nickname, value});
}
function emitMoveMemberHorizontal(value){
  socket.emit('member:moveHorizontal', {nickname, value});
}

function moveMember({nickname, coordinates}) {
  const memberEl = document.querySelector(`.${nickname}`);
  memberEl.style.left = coordinates.left +'px';
  memberEl.style.top = coordinates.top + 'px';

}

//

// Keep members actual
function onMembersListUpdate(membersList) {
  console.log(membersList);
  membersList.forEach((member) => {
    const existsMember = document.querySelector(`.${member.nickname}`);

    if (!existsMember){
      const newItem = document.createElement('div');
      newItem.classList.add('member', `${member.nickname}`);
      newItem.innerText = member.nickname;

      newItem.style.left = member.coordinates.left +'px';
      newItem.style.top = member.coordinates.top +'px';
  
      fieldOfMembers.appendChild(newItem);
    }
  })
}
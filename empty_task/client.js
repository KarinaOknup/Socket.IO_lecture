const port = 3000;
// action buttons
const buttonUp = document.getElementById('buttonUp');
const buttonDown = document.getElementById('buttonDown');
const buttonRight = document.getElementById('buttonRight');
const buttonLeft = document.getElementById('buttonLeft');

const fieldOfMembers = document.getElementById('field');


// write how u will take nickname and room
// YOUR CODE //
//

// make import/connection to library and your port
// YOUR CODE // const socket = io(..., ...)
//

// write function or log on event 'connect'
// YOUR CODE // 
//

// handle event by moving el, event can be  'member:moved'
// YOUR CODE //
//

// handle event by updating member list, event can be  'membersList:updated'
// YOUR CODE //
//


// Moving members

buttonUp.onclick = () => emitMoveMemberVertical(-10);
buttonDown.onclick = () => emitMoveMemberVertical(10);
buttonLeft.onclick = () => emitMoveMemberHorizontal(-10);
buttonRight.onclick = () => emitMoveMemberHorizontal(10);

function emitMoveMemberVertical(value){
  // emit event to server -  for example 'member:moveVertical'
}
function emitMoveMemberHorizontal(value){
  // emit event to server -  for example 'member:moveHorizontal'
}

function moveMember({nickname, coordinates}) {
  const memberEl = document.querySelector(`.${nickname}`);
  memberEl.style.left = coordinates.left +'px';
  memberEl.style.top = coordinates.top + 'px';
}

// Keep members actual
function onMembersListUpdate(membersList) {
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
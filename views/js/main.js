const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const usersList = document.querySelector('#users');

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});
console.log(username ,room);

//Join the chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room);
    outputUsers(users);
});

// add users to DOM
function outputUsers(users){
    usersList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join()}`
}

// Serverdan kelgan xabarni qabul qilish
socket.on('message', message=>{
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value
    socket.emit('chatMessage', msg)
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Qabul qilingan xabarni output (html) qilish
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>
                        `;
    chatMessages.appendChild(div);
}

// add room name to DOM
function outputRoomName(room){
    roomName.innerText  = room;
}

// add users to DOM
function outputUsers(users){
    usersList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join(' ')}`
}
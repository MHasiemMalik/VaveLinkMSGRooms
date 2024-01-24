const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');




//const socket = io(); doesnt work in github in normal pc it does

const socket = io('https://mhasiemmalik.github.io');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

//console.log(username, room);

//join chat room
socket.emit('joinRoom',{username, room});

//Get room
socket.on('roomUsers',({room,users}) =>{
     outputRoomName(room);
     outputUsers(users);
});

//message from the server
socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    //scroll name
    chatMessages.scrollTop=chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
     
    //Get Message text
    const msg=e.target.elements.msg.value;
    
    //Emiting a message to the server  
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});


//output the Message to DOM
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}


//Add room name to DOM
function outputRoomName(room){
   roomName.innerText=room;
}

//Add users to DOM
function outputUsers(users){
    userList.innerHTML=`
     ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}


const socket = io('http://localhost:8000');

//get DOM elements in a respective js variable

const form  = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer =  document.querySelector('.container');

// an adio wiii play when someone recieave a message
var audio  = new Audio("ting.mp3");






// function which will append to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
    if(position == 'left'){
    audio.play();

    }
}

//ask new user for his/her name and let the server know!
// const name = prompt('Enter your name Here:');
socket.emit('new-user-joined',name);

// if a new user joins receive HIS/HER NAME FROM the s server
socket.on('user-joined',data=>{

    append(`${name} joined The Chat`,`right`);

})


// if server sends a message receieve it
socket.on('receive',data=>{

    append(`${data.name}: ${data.message}`,`left`);

})

// if a user left the chat append the info to the container
socket.on('left',name=>{

    append(`${name}: left the chat`,`right`);

})


// if the form gets submitted send server a message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = "";
})

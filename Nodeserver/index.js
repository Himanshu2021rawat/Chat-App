//  node server which will help in server connection 

// const io = require('socket.io')(8000) causing error so we used:-->

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        // if any new user joins ,let the other users connected  to the server Know!

        // just to check my code i use console
        // console.log("New user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });




// if someone sends a message broadcast into other peoples
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });


    // if someone leave the chatvlet others know
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

    

});   

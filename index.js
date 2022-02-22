// Bismillahi rahmoni rohiym
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const express = require('express'),
app = express();
const mongoose = require('mongoose');
const { post } = require('./post');

// use io
const server = http.createServer(app);
const io = socketio(server);

// routerlar olish
const postRouter = require('./post');
const panelRouter = require('./users/panel')
//username=tonggibesh  password=rich1234

// port o'zgaruvchisini olish
const port = process.env.PORT || 2002


// static papkani ulash
app.use(express.static(path.join(__dirname, 'public')));

// inputdan olingan ma'lumotni json formatga o'girish
app.use(express.json());

// view engine sozlash (hbs)
app.set('view engine', 'hbs')
app.use( express.urlencoded({ extended:false}));
        

// Frontend bilan bog'lanish
io.on('connection', socket =>{
    socket.on('joinRoom', ({username, room})=>{

    const user = userJoin(socket.id, username, room);

    socket.join(user.room)
    
    // Welcome current user
    socket.emit('message',formatMessage(username, 'Welcome realtimeChat') );

    // Qachonki user connect bo'lganda
    socket.broadcast.to(user.room).emit('message',formatMessage(username, `${user.username} has joined the chat`));
    
        // User va room ma'lumotlarini yuborish
        io.to(user.room).emit('roomUsers', {
            room : user.room,
            users : getRoomUsers(user.room)
        });
    });



    // Userdan kelgan xabarni qabul qilish
    socket.on('chatMessage', msg=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',formatMessage(user.username, msg))
    });
    
    // Qachonki user disconnect bo'lsa
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage(user.username, `${user.username} has left the chat`));
    
            // User va room ma'lumotlarini yuborish
            io.to(user.room).emit('roomUsers', {
                room : user.room,
                users : getRoomUsers(user.room)
            });
        }
    });


})
        
        
// routerlarni o'rnatish
app.use(postRouter);
app.use(panelRouter);

server.listen(port, ()=> console.log(`Server has been started on port ${port}...`));
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' }})

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const botName = 'ChatApp';

//Run when client connects
io.on('connection', (socket) => {
    console.log('user connected');
    // Join room
    socket.on('join', (data)=> {
      const user = userJoin(socket.id, data.user, data.room);
      socket.join(data.room)

      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to ChatApp!'));

      // Broadcast when a user connects
      socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('leave', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

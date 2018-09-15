const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'hey. what is going on.',
    createdAt: new Date()
  });

  socket.on('createMessage', (newMessage)=> {
    console.log('new message:', newMessage);
  });

  socket.on('disconnect', (reason)=> {
    console.log('User disconnected');
  });
});



server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});

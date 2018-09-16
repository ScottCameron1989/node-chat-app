const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('admin','welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

  socket.on('createMessage', (message)=> {
    console.log('new message:', message);
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   date: new Date().getTime()
    // });
    io.emit('newMessage', generateMessage(message.from,message.text));
  });

  socket.on('disconnect', (reason)=> {
    console.log('User disconnected');
  });
});



server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});

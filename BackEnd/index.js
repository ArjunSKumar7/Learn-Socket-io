const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require("socket.io");
const { log } = require('console');
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
  });


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send-message", (message) => {
//broadcast the message to all connected user
    io.emit("received-message", message);
  })
  
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});



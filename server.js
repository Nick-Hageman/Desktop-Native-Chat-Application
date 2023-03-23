const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// User connects to server
io.on("connection", (socket) => {
  console.log("New Client Connected");
  
  // User disconnects from server
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  // Foo
  socket.on('create-something', (value) => {
    console.log(value);
    io.emit('foo', value);
  });

});

io.listen(4000, () => {
  console.log('listening on *:4000');
});

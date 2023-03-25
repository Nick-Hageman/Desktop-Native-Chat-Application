const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let users = {};
const messages = { // Implement Database rather than storing on this server
  general: [],
  announcements: [],
  links: [],
  help: []
}

// User connects to server
io.on("connection", (socket) => {
  console.log("New Client Connected");
  /*
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
  users.push(user);
  io.emit("new user", users);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });

  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    if (isChannel) { // Check if sending to a channel
      const payload = {
        content,
        chatName,
        sender,
      };
      socket.to(to).emit("new message", payload);
    } else { // Check if sending to another user (Direct message)
      const payload = {
        content,
        chatName: sender,
        sender,
      };
      socket.to(to).emit("new message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content
      });
    }
  });
*/
  
  
  // User disconnects from server
  socket.on('disconnect', () => {
    console.log(socket.id + ' Disconnected');
    delete users[socket.id]; // delete user from Dictionary after disconnecting
  });

  // Foo (New chat created)
  socket.on('create-something', (value) => {
    console.log("USER CHAT: " + value + " || SENT: " + Date(Date.now()).toString());
    io.emit('foo', value);
    payload = {
      message: value,
      name: users[socket.id],
      date: Date(Date.now()).toString()
    }
    console.log(payload); //TODO: use the payload to send to the client -> include name & dates on messages
    // TODO: Need to use a DB and store this information so it's still available after restarting server/disconnecting
  });

  //For connecting to different Chat rooms
  socket.on('connect-room-1', () => {
    socket.emit("room1");
  });
  socket.on('connect-room-2', () => {
    socket.emit("room2");
  });
  socket.on('connect-room-3', () => {
    socket.emit("room3");
  });
  socket.on('connect-room-4', () => {
    socket.emit("room4");
  });

  // Called after a user logs in
  socket.on('new-login', (value) => {
    console.log("New Login: " + value);
    users[socket.id] = value; // Store name & ID in user Dictionary
    io.emit('bar', value); // Calls the client to create a new element to show online Users
  });

});

io.listen(4000, () => {
  console.log('listening on *:4000');
});

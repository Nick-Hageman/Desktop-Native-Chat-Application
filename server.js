const { createServer } = require("http");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");

const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const mongoClient = new MongoClient("mongodb+srv://chatapp:123@chatcluster.eqemmmr.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
});

let users = {};
const messages = { // Implement Database rather than storing on this server
  general: [],
  announcements: [],
  links: [],
  help: []
}

const main = async () => {
  await mongoClient.connect();

  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6
    });
  } catch (e) {
    // collection already exists
  }
  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

  io.adapter(createAdapter(mongoCollection));
// User connects to server
io.on("connection", (socket) => {
  console.log("New Client Connected");
  
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
}

main();
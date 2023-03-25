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
let arr1 = []; // will store messages FROM MongoDB depending on room
let arr2= [];
let arr3 = []; 
let arr4 = [];

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
  mongoCollection.drop(); //temp clear collection when server turns off

  io.adapter(createAdapter(mongoCollection));

  const updateChat = async (roomNum) => { // update chat's when new connections or new chats sent
    try {
      x = await mongoCollection.find({chatroom: roomNum}).toArray(); // get 8 recent most chats (room1)
      for (i in x) { // modify the current chatroom array
        if (roomNum == 1) {
          arr1[i] = x[i].message;
        } else if (roomNum == 2) {
          arr2[i] = x[i].message;
        } else if (roomNum == 3) {
          arr3[i] = x[i].message;
        } else if (roomNum == 4) {
          arr4[i] = x[i].message;
        }
      }
    } catch (e) {
      // collection already exists
    }
  }
// User connects to server
io.on("connection", (socket) => {
  console.log("New Client Connected");
  
  // User disconnects from server
  socket.on('disconnect', () => {
    console.log(socket.id + ' Disconnected');
    delete users[socket.id]; // delete user from Dictionary after disconnecting
    io.emit('bar', users); // Calls the client to create a new element to show online Users
  });

  // Foo (New chat created)
  socket.on('create-something', async (value) => {
    //console.log("USER CHAT: " + value.message + " || SENT: " + Date(Date.now()).toString());
    //io.emit('foo', value.message);
    payload = {
      message: value.message,
      sender: users[socket.id],
      date: Date(Date.now()).toString(),
      chatroom: value.chatRoom
    }
    mongoCollection.insertOne(payload);
    await updateChat(value.chatRoom); // Updates whatever chat the new message was created in
    if (value.chatRoom == 1) { // Call 'foo' to update values on Client side
      io.emit('foo', arr1);
    } else if (value.chatRoom == 2) {
      io.emit('foo', arr2);
    } else if (value.chatRoom == 3) {
      io.emit('foo', arr3);
    } else if (value.chatRoom == 4) {
      io.emit('foo', arr4);
    }
    //EXECUTE update function
    //---------------console.log(payload); //TODO: use the payload to send to the client -> include name & dates on messages
    // TODO: Need to use a DB and store this information so it's still available after restarting server/disconnecting
  });

  //For connecting to different Chat rooms
  socket.on('connect-room', (value) => {
    socket.emit("room", value);
    console.log(users[socket.id] + " entering Room: " + value);
    if (value == 1) {
      socket.emit("foo", arr1);
    } else if (value == 2) {
      socket.emit("foo", arr2);
    } else if (value == 3) {
      socket.emit("foo", arr3);
    } else if (value == 4) {
      socket.emit("foo", arr4);
    }
    //socket.emit("foo", ["This", "is", "a", "test"]);
  });

  // Called after a user logs in
  socket.on('new-login', (value) => {
    console.log("New Login: " + value);
    users[socket.id] = value; // Store name & ID in user Dictionary
    //mongoCollection.insertOne({name: value, socket: socket.id}); // Add new user to database
    io.emit('bar', users); // Calls the client to create a new element to show online Users
  });

});

io.listen(4000, () => {
  console.log('listening on *:4000');
});
}

main();
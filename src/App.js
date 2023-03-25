import logo from './logo.svg';
import './App.css';
import img from './hawktalk.png';
import img2 from './onlineStatus.png';
import img3 from './offlineStatus.png';

// Socket.io imports //
import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { Events } from './components/Events';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { RoomManager } from './components/RoomManager';
import { LoginPage } from './components/LoginPage';
import { Users } from './components/Users';

//import immer from "immer";

/* Default React Template
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header>
*/

function App() {
  // Socket.io //
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [barEvents, setBarEvents] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [inRoom, setRoom] = useState(1);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      //console.log("Client Connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      //setLoggedIn(false); // Get the login screen back after disconnecting
    }

    function onFooEvent(value) {
      setFooEvents(value); // Get messages from server: "value"
    }

    function onBarEvent(value) {
      console.log("New Login: ", value);
      setLoggedIn(true);
      setBarEvents(value);
    }

    function connectRoom(value) {
      setRoom(value); // Change room # state
      //call server to update messages depending on Room
    }
    

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent); // listens for server 'emit' to add chats
    socket.on('bar', onBarEvent);
    socket.on('room', connectRoom);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.off('bar', onBarEvent);
      socket.off('room', connectRoom);

    };
  }, []);

  let body;
  if (!isLoggedIn) { // 'State' of being logged in
    body = (
      <LoginPage />
    )
  } else {
    body = (
      <></>
    )
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className='menu-connection'>
          <img src={img} className="hawktalk" width="100%" height="90%" />
        </div>
        <div className="middle">
          <RoomManager roomNum = { inRoom }/>
        </div>
        <div className='profile-info'>-My Profile-</div>
      </div>
        <div className='chat-header'>#General</div>
        {body}
        <Events events={ fooEvents } />
        <MyForm roomNum = { inRoom }/>
      <div className="sidebar2">
        <Users events={ barEvents } />
      </div>
    </div>
  );
}

export default App;

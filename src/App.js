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
  const [inRoom1, setRoom1] = useState(true); // Default to Room 1
  const [inRoom2, setRoom2] = useState(false);
  const [inRoom3, setRoom3] = useState(false);
  const [inRoom4, setRoom4] = useState(false);

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
      setFooEvents(previous => [...previous, value]);
    }

    function onBarEvent(value) {
      console.log("New Login: ", value);
      setLoggedIn(true);
      setBarEvents(previous => [...previous, value]);
    }

    function connectRoom1() {
      setRoom1(true);
      setRoom2(false);
      setRoom3(false);
      setRoom4(false);
    }
    function connectRoom2() {
      setRoom1(false);
      setRoom2(true);
      setRoom3(false);
      setRoom4(false);
    }
    function connectRoom3() {
      setRoom1(false);
      setRoom2(false);
      setRoom3(true);
      setRoom4(false);
    }
    function connectRoom4() {
      setRoom1(false);
      setRoom2(false);
      setRoom3(false);
      setRoom4(true);
    }
    

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent); // listens for server 'emit' to add chats
    socket.on('bar', onBarEvent);
    socket.on('room1', connectRoom1);
    socket.on('room2', connectRoom2);
    socket.on('room3', connectRoom3);
    socket.on('room4', connectRoom4);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.off('bar', onBarEvent);
      socket.off('room1', connectRoom1);
      socket.off('room2', connectRoom2);
      socket.off('room3', connectRoom3);
      socket.off('room4', connectRoom4);

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

  let chatroom; // 'State' of chat room
  if (inRoom1) {
    chatroom = (
      <Events events={ fooEvents } />
      )
  } else if (inRoom2) {
    chatroom = (
      <></>
    )
  } // TODO: Check remaining 'else if' cases

  return (
    <div className="App">
      <div className="sidebar">
        <div className='menu-connection'>
          <img src={img} className="hawktalk" width="100%" height="90%" />
        </div>
        <div className="middle">
          <RoomManager />
        </div>
        <div className='profile-info'>-My Profile-</div>
      </div>
        <div className='chat-header'>#General</div>
        {body}
        {chatroom}
        <MyForm />
      <div className="sidebar2">
        <ConnectionState isConnected={ isConnected } />
        <ConnectionManager />
        <Users events={ barEvents } />
        <div><img src={img2} width="10" height="10" />  User1: Online</div>
        <div><img src={img3} width="10" height="10" />  User2: Online</div>
        <div><img src={img3} width="10" height="10" />  User3: Online</div>
      </div>
    </div>
  );
}

export default App;

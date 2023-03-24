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

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      //console.log("Client Connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log("USER CHAT: ", value);
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent); // listens for server 'emit' to add chats

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <div className='menu-connection'>
          <img src={img} className="hawktalk" width="100%" height="90%" />
        </div>
        <div className="middle">
          <a href="#" className="btn btn1">Room 1</a>
          <a href="#" className="btn btn2">Room 2</a>
          <a href="#" className="btn btn3">Room 3</a>
          <a href="#" className="btn btn4">Room 4</a>
        </div>
        <div className='profile-info'>-My Profile-</div>
      </div>
        <div className='chat-header'>#General</div>
        <Events events={ fooEvents } />
        <MyForm />
      <div className="sidebar2">
        <ConnectionState isConnected={ isConnected } />
        <ConnectionManager />
        <div><img src={img2} width="10" height="10" />  User1: Online</div>
        <div><img src={img3} width="10" height="10" />  User2: Online</div>
        <div><img src={img3} width="10" height="10" />  User3: Online</div>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

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
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <header className="App-header">
      <Events events={ fooEvents } />
      </header>
      <MyForm />
    </div>
  );
}

export default App;

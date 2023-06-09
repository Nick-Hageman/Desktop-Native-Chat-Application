import React from 'react';
import { socket } from '../socket';

export function RoomManager({ roomNum }) {
  function connectRoom1() {
    socket.emit("connect-room", 1); // include room # argument
  }
  function connectRoom2() {
    socket.emit("connect-room", 2);
  }
  function connectRoom3() {
    socket.emit("connect-room", 3);
  }
  function connectRoom4() {
    socket.emit("connect-room", 4);
  }

  //socket.emit // Change messages depending on chat

  return (
    <>
      <hr className="new5"></hr>
      <a href="#" className="btn btn1" onClick={ connectRoom1 }>#Announcements</a>
      <a href="#" className="btn btn2" onClick={ connectRoom2 }>#General-chat</a>
      <a href="#" className="btn btn3" onClick={ connectRoom3 }>#Links</a>
      <a href="#" className="btn btn4" onClick={ connectRoom4 }>#Help</a>
    </>
  );
}
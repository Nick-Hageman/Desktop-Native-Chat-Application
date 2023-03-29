import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm({ roomNum }) {
  if (roomNum == "#Announcements") {
    roomNum = 1;
  } else if (roomNum == "#General") {
    roomNum = 2;
  } else if (roomNum == "#Links") {
    roomNum = 3;
  } else if (roomNum == "#Help") {
    roomNum = 4;
  }

  const [value, setValue] = useState(''); //make object {e.target.value, chatroom}
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(1000).emit('create-something', { message: value, chatRoom: roomNum }, () => { // Limited to a chat every second (1000ms)
      setIsLoading(false);
    });
    document.getElementById('submit-form').reset();
    //<button id="submit-button" type="submit" disabled={ isLoading }>Submit</button>
  }

  return (
    <form id="submit-form" onSubmit={ onSubmit }>
      <input id="submit-input" placeholder="Message..." onChange={ e => setValue(e.target.value) } />

    </form>
  );
}
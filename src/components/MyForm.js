import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(1000).emit('create-something', value, () => { // Limited to a chat every second (1000ms)
      setIsLoading(false);
    });
    //<button id="submit-button" type="submit" disabled={ isLoading }>Submit</button>
  }

  return (
    <form id="submit-form" onSubmit={ onSubmit }>
      <input id="submit-input" placeholder="Message..." onChange={ e => setValue(e.target.value) } />

    </form>
  );
}
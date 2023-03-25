import React, { useState } from 'react';
import { socket } from '../socket';
import img from '../hawktalk.png';

export function LoginPage() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.id = value; // Change socket ID to their entered username
    socket.timeout(1000).emit('new-login', value, () => { // Limited to a chat every second (1000ms)
      setIsLoading(false);
    });

    //<button id="submit-button" type="submit" disabled={ isLoading }>Submit</button>
  }

  return (
    <div className='login-div'>
        <img src={img} className="hawktalk" width="40%" height="40%" />
        <div className='login-title'>Login</div>
        <form id="login-form" onSubmit={ onSubmit }>
        <input id="login-input" placeholder="Enter Username..." onChange={ e => setValue(e.target.value) } />
        </form>
    </div>
  );
}
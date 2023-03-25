import React from 'react';

export function Events({ events }) {
  return (
    <ul className='message-list'>
    {
      events.map((event, index) =>
        <li className='chat-message' key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}
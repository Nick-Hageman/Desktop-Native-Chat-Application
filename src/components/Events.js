import React from 'react';

export function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li className='chat-message' key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}
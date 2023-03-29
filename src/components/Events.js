import React from 'react';

export function Events({ events }) {
  events = events.reverse();
  return (
    <ul className='message-list'>
    {
      events.map((event, index) =>
      <div className='message-div'>
        <p className='message-handle'>{ event[1] }<p className='message-date'> &nbsp; { event[2] }</p></p>
        <li className='chat-message' key={ index }>{ event[0] }</li>
      </div>
      )
    }
    </ul>
  );
}
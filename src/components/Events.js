import React from 'react';

export function Events({ events }) {
  let newEvents = [];
  for (let k in events) {
    newEvents.push(events[k]);
  }
  console.log(newEvents);
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
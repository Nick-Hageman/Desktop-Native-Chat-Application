import React from 'react';
import img2 from '../onlineStatus.png';

export function Users({ events }) {
  let newEvents = [];
  for (let k in events) {
    newEvents.push(events[k]);
  }
  return (
    <ul>
      <li>Users Online: {newEvents.length}</li>
    {
      newEvents.map((event, index) =>
        //<li className='chat-message' key={ index }>{ event }</li>
        <div><img src={img2} width="10" height="10" /> { event } </div>
      )
    }
    </ul>
  );
}
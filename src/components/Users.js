import React from 'react';
import img2 from '../onlineStatus.png';

export function Users({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        //<li className='chat-message' key={ index }>{ event }</li>
        <div><img src={img2} width="10" height="10" />  { event }: Online</div>
      )
    }
    </ul>
  );
}
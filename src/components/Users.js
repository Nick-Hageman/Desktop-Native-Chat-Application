import React from 'react';
import img2 from '../onlineStatus.png';

export function Users({ events }) {
  let newEvents = [];
  for (let k in events) {
    newEvents.push(events[k]);
  }
  return (
    <>
      <p className='channel-list'>Users Online: {newEvents.length}</p>
      <hr className="new5"></hr>
      <ul className='online-users-list'>
      {
        newEvents.map((event, index) =>
          //<li className='chat-message' key={ index }>{ event }</li>
          <div><img src={img2} width="10" height="10" /> { event } </div>
        )
      }
      </ul>
    </>
  );
}
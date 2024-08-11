import React from 'react';
import './TotalRegistries.module.css'

function MessageData({ message, data, unit }) {

  return (
    <div className='messageDataContainer'>
      <p><span>{message}</span> <span className='count'>{data}</span><span>{unit}</span></p>
    </div>
  )
}

export default MessageData





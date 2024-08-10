import React from 'react';
import './TotalRegistries.module.css'

function TotalRegistries({ active, count }) {

  return (
    <div>
      <p>Numero total de registros para {active}: <span className='count'>{count}</span></p>
    </div>
  )
}

export default TotalRegistries





import React from 'react';
// import './TotalRegistros.module.css'

function AllRegistriesList({ data, active }) {

  let card
  if (active === 'presidentes') {
    card = (item, i) => <div key={item.name + item.lastName + i}>
      <div><img src={item.image} alt={`imagen para presidente ${item.name + item.lastName}`} /></div>
      <div className='president-info'>
        <p>{item.name + " " + item.lastName}</p>
        <p>{item.description}</p>
        <div>
          <h3>Partido:</h3>
          <span>{item.politicalParty}</span>
        </div>
        <div>
          <h3>Periodo presidencial:</h3>
          <span>{item.startPeriodDate + " - " + item.endPeriodDate}</span>
        </div>
      </div>
    </div>
  } else {
    card = (item, i) => (
      <div key={i}>
        <p>No card defined for active: {active}</p>
      </div>
    );
  }

  return (
    <div>
      {data.map((p, i) => (
        card(p, i)
      ))}
    </div>
  )
}

export default AllRegistriesList





import React from 'react';
import './AllRegistries.module.css'

function AllRegistriesList({ data, active, departments }) {

  let card
  if (active === 'presidentes') {
    card = (item, i) =>
      <div className='cardContainer' key={item.name + item.lastName + i}>
        <div className='cardContainer__image-container'><img src={item.image} alt={`imagen para presidente ${item.name + item.lastName}`} /></div>
        <div className='cardContainer__presidentInfo'>
          <h2 className='presidentInfo__name'>{item.name + " " + item.lastName}</h2>
          <p className='presidentInfo__description'>{item.description}</p>
          <div className='presidentInfo__politicalParty'>
            <h3>Partido:</h3>
            <span>{item.politicalParty}</span>
          </div>
          <div className='presidentInfo__period'>
            <h3>Periodo presidencial:</h3>
            <span>{item.startPeriodDate + " - " + item.endPeriodDate}</span>
          </div>
        </div>
      </div>

  } else if (active === 'atracciones') {
    card = (item, i) => {
      let departmentName
      let cityName
      if (item.city) {
        departmentName = departments.find(d => d.id === item.city.departmentId).name
        cityName = item.city.name
      }
      return (
        <div className='cardContainer' key={item.name + i}>
          <div className='cardContainer__image-container'><img src={item.images} alt={`imagen para atracción turística ${item.name}`} /></div>
          <div className='cardContainer__presidentInfo'>
            <h2 className='presidentInfo__name'>{item.name}</h2>
            <div className='presidentInfo__politicalParty'>
              <p>{departmentName + ", " + cityName}</p>
            </div>
            <p className='presidentInfo__description'>{item.description}</p>

          </div>
        </div>
      )
    }
  } else if (active === 'aeropuertos') {
    card = (item, i) => {
      let departmentName
      let cityName
      if (item.city && item.department) {
        departmentName = item.department.name
        cityName = item.city.name
      }

      return (
        <div className='cardContainer' key={item.name + i}>
          <div>
            <h2 className='presidentInfo__name'>{item.name}</h2>
            <div className='presidentInfo__politicalParty'>
              <p>{departmentName + ", " + cityName}</p>
            </div>
          </div>
          <div>
            <div className='presidentInfo__politicalParty'>
              <h3>Código IATA:</h3>
              <span>{item.iataCode}</span>
            </div>
            <div className='presidentInfo__politicalParty'>
              <h3>Código OACI:</h3>
              <span>{item.oaciCode}</span>
            </div>
            <div className='presidentInfo__politicalParty'>
              <h3>Tipo de aeropuerto:</h3>
              <span>{item.type}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  else {
    card = (item, i) => (
      <div key={i}>
        <p>No card defined for active: {active}</p>
      </div>
    );
  }

  return (
    <div className='cardListContainer'>
      {data.map((p, i) => (
        card(p, i)
      ))}
    </div>
  )
}

export default AllRegistriesList





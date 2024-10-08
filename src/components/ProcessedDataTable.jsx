import React from 'react';
import './ProcessedDataTable.module.css'

function ProcessedDataTable({ data, active, departments }) {

  let renderRow
  // let renderList

  if (active === 'presidentes') {
    renderRow = (politicalParty, president, i, arr) =>
      <React.Fragment>
        <tr key={politicalParty + president.name + president.lastName + president.startPeriodDate + president.endPeriodDate}>
          <th>{politicalParty}</th>
          <td>{president.name + " " + president.lastName}</td>
          <td>{president.startPeriodDate}</td>
          <td>{president.endPeriodDate}</td>
        </tr>
        {i === arr.length - 1 &&
          <tr className='presidentsTable__total-row' key={politicalParty + president.name + president.lastName + president.startPeriodDate}>
            <th className='presidentsTable__total-text'>Total presidentes</th>
            <td className='presidentsTable__total-value' colSpan={3}>{arr.length}</td>
          </tr>
        }
      </React.Fragment>

  } else if (active === 'atracciones') {

    const renderItem = (dep, city, items) => {
      if (items.map) {

        return items.map((item, i, arr) => {
          return (
            <React.Fragment>
              <tr>
                <td>{dep}</td>
                <td>{city}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            </React.Fragment>
          )
        })
      }
    }

    renderRow = (data) => {
      const trList = []
      // [
      //   ['Antioquia', {
      //     { jerico: {items: [], count: 1}},
      //     { jerico: {items: [], count: 1}},
      //     { jerico: {items: [], count: 1}},
      //   }], 

      //   ['Atlantico', {
      //     { barraquilla: {items: [], count: 1}},
      //   }], 
      // 
      // ]
      const entries = Object.entries(data)


      for (const entry of entries) {
        const departamento = entry[0]
        const locationsPerCity = Object.entries(entry[1])
        for (const locationsData of locationsPerCity) {
          const ciudad = locationsData[0]
          const locationsAndCount = Object.entries(locationsData[1])
          const items = locationsAndCount[0][1]

          trList.push(renderItem(departamento, ciudad, items))

        }
      }

      return [...trList]
    }
  }
  else if (active === 'aeropuertos') {

    const renderItem = (dep, city, items) => {
      if (items.map) {

        return items.map((item, i, arr) => {
          return (
            <React.Fragment>
              <tr>
                <td>{dep}</td>
                <td>{city}</td>
                <td>{item.name}</td>
                <td>{item.oaciCode}</td>
                <td>{item.iataCode}</td>
                <td>{item.type}</td>
              </tr>
            </React.Fragment>
          )
        })
      }
    }

    renderRow = (data) => {
      const trList = []
      // [
      //   ['Antioquia', {
      //     { jerico: {items: [], count: 1}},
      //     { jerico: {items: [], count: 1}},
      //     { jerico: {items: [], count: 1}},
      //   }], 

      //   ['Atlantico', {
      //     { barraquilla: {items: [], count: 1}},
      //   }], 
      // 
      // ]
      const entries = Object.entries(data)

      for (const entry of entries) {
        const departamento = entry[0]
        const locationsPerCity = Object.entries(entry[1])
        for (const locationsData of locationsPerCity) {
          const ciudad = locationsData[0]
          const locationsAndCount = Object.entries(locationsData[1])
          const items = locationsAndCount[0][1]

          trList.push(renderItem(departamento, ciudad, items))

        }
      }

      return [...trList]
    }

  }

  else {
    renderRow = (item, i) => (
      <div key={i}>
        <p>No table row defined for active: {active}</p>
      </div>
    );
  }

  return (
    <div className='cardListContainer'>
      <table className='presidentsTable'>
        <thead>
          {active === 'presidents' &&
            <tr>
              <th>Partido Politico</th>
              <th>Nombre</th>
              <th>Inicio Gobierno</th>
              <th>Fin Gobierno</th>
            </tr>
          }
          {active === 'atracciones' &&
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          }
          {active === 'aeropuertos' &&
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Nombre</th>
              <th>Cod. OACI</th>
              <th>Cod. IATA</th>
              <th>Tipo</th>
            </tr>
          }
        </thead>
        <tbody>
          {data &&
            (active === 'presidentes' ? data.map((obj, i) => {
              const [key, array] = Object.entries(obj)[0]
              return (
                <React.Fragment key={key + i}>
                  {array.map((p, i, arr) => renderRow(key, p, i, arr))}
                </React.Fragment>
              )
            })
              : active === 'atracciones' ? renderRow(data)
                : active === 'aeropuertos' ? renderRow(data)
                  : null
            )
          }

        </tbody>

      </table>
      {/* {data.map((p, i) => (
        card(p, i)
      ))} */}
    </div>
  )
}

export default ProcessedDataTable
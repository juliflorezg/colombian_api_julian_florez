import React from 'react';
import './ProcessedDataTable.module.css'

function AirportsProcessedData({ data, active }) {

  let renderRow
  // let renderList

  if (active === 'aeropuertos') {

    const renderItem = (r, d, c, t, count) => {
      // if (items.map) {

      //   return items.map((item, i, arr) => {
      return (
        <React.Fragment>
          <tr>
            <td>{r}</td>
            <td>{d}</td>
            <td>{c}</td>
            <td>{t}</td>
            <td>{count}</td>
          </tr>
        </React.Fragment>
      )
      // })
    }

    renderRow = (data) => {
      const trList = []
      // {
      //   "region": {
      //     "Caribe": {
      //       "departamento": {
      //         "Atlántico": {
      //           "ciudad": {
      //             "Barranquilla": {
      //               "tipo": {
      //                 "Internacional": 1
      //               }
      //             }
      //           }
      //         },
      //         ...
      //       }
      //     },
      //     ...
      //   }
      // }
      for (const region in data.region) {
        for (const departamento in data.region[region].departamento) {
          for (const ciudad in data.region[region].departamento[departamento].ciudad) {
            for (const tipo in data.region[region].departamento[departamento].ciudad[ciudad].tipo) {
              const conteo = data.region[region].departamento[departamento].ciudad[ciudad].tipo[tipo];
              trList.push(renderItem(region, departamento, ciudad, tipo, conteo))
            }
          }
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

          {active === 'aeropuertos' &&
            <tr>
              <th>Región</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Conteo</th>
            </tr>
          }
        </thead>
        <tbody>
          {data &&
            (active === 'aeropuertos' ? renderRow(data) : null
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default AirportsProcessedData
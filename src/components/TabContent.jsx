import React, { useContext, useEffect, useState } from 'react';
import useFetchPresident from '../hooks/useFetchPresidents';
import useFetchTouristicLocations from '../hooks/useFetchTouristicLocations';
import useFetchAirports from '../hooks/useFetchAirports';
import GlobalDataContext from '../store/globalDataContext';
import useFetchAirportsByDepCityType from '../hooks/useFetchAirportsByDepCityType';
import './TabHeader.module.css'
import MessageData from './TotalRegistries';
import AllRegistriesList from './AllRegistriesList';
import './TabContent.module.css'
import ProcessedDataTable from './ProcessedDataTable';
import AirportsProcessedData from './AirportsProcessedData';

function TabContent({ active }) {
  const { departments, regions } = useContext(GlobalDataContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dataPresidents, loadingPresidents, errorPresidents] = useFetchPresident(active)
  const [dataLocations, loadingLocations, errorLocations] = useFetchTouristicLocations(departments, active)
  const [dataAirports, loadingAirports, errorAirports] = useFetchAirports(departments, active)
  const [airportsByRegDepCityType, loadingAirportsType, errorAirportsType] = useFetchAirportsByDepCityType(departments, regions, active)


  useEffect(() => {
    switch (active) {
      case "presidentes": {
        setData(dataPresidents)
        setLoading(loadingPresidents)
        setError(errorPresidents)
        break
      }
      case "atracciones": {
        setData(dataLocations)
        setLoading(loadingLocations)
        setError(errorLocations)
        break
      }
      case "aeropuertos": {
        setData(dataAirports)
        setLoading(loadingAirports)
        setError(errorAirports)
        break
      }
    }
  }, [active, dataPresidents, loadingPresidents, dataLocations, loadingLocations, dataAirports, loadingAirports, airportsByRegDepCityType])

  const loadingSpinnerHTML = <svg className="spinner" viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
  </svg>

  return (
    <React.Fragment>
      {loading ? (
        <div className='spinnerContainer'>
          {loadingSpinnerHTML}
        </div>
      ) : (
        <div className='tabContentContainer'>

          <h2>
            Un componente que exponga la cantidad de registros existentes por cada
            entidad.
          </h2>

          {data !== null ? (
            <MessageData message={`Número de registros para la entidad ${active}:`} data={data.count} />
          ) : null}

          <h2>
            Un componente con todos los registros de cada entidad.
          </h2>

          {data !== null ? (
            <AllRegistriesList data={data.data} active={active} departments={departments} />
          ) : null}


          <h2>
            Un componente por cada una de las funciones solicitadas en cada entidad del
            ítem 2. Procesamiento.
          </h2>

          {data !== null ? (
            <ProcessedDataTable data={data.processedData} active={active} departments={departments} />
          ) : null}

          {data !== null && active === 'aeropuertos' ?
            <React.Fragment>
              <h2>
                En el caso del numeral d del ítem 2. Procesamiento, el componente debe
                mostrar la visualización de la estructura de datos final.
              </h2>
              <AirportsProcessedData data={airportsByRegDepCityType} active={active} />
            </React.Fragment>
            : null}

          <h2>
            Un componente que muestre el tiempo de respuesta de la solicitud a la API (al
            solicitar los datos de cada entidad).
          </h2>
          {data !== null ? (
            // <TotalRegistries active={active} count={data.count} />
            <MessageData message={`Tiempo de respuesta para la entidad ${active}:`} data={data.apiResponseInSec} unit="segundos" />
          ) : null}


        </div>
      )}
    </React.Fragment>
  );
}

export default TabContent
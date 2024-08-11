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
      <p>{active}</p>
      <p>{loading}</p>
      {loading ? (
        <div className='spinnerContainer'>
          {loadingSpinnerHTML}
        </div>
      ) : (
        <div>
          {data !== null ? (
            <MessageData message={`Número de registros para la entidad ${active}:`} data={data.count} />
          ) : null}

          {data !== null ? (
            <AllRegistriesList data={data.data} active={active} departments={departments} />
          ) : null}

          {data !== null ? (
            <ProcessedDataTable data={data.processedData} active={active} departments={departments} />
          ) : null}

          {data !== null && active === 'aeropuertos' ?
            <AirportsProcessedData data={airportsByRegDepCityType} active={active} />
            : null}

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
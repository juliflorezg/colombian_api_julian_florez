import React, { useContext, useState } from 'react';
import useFetchPresident from '../hooks/useFetchPresidents';
import useFetchTouristicLocations from '../hooks/useFetchTouristicLocations';
import useFetchAirports from '../hooks/useFetchAirports';
import GlobalDataContext from '../store/globalDataContext';
import useFetchAirportsByDepCityType from '../hooks/useFetchAirportsByDepCityType';
import TabComponent from './TabComponent';
// import logo from './logo.svg';
// import './App.css';

function ColombiaDash() {
  const { departments, regions } = useContext(GlobalDataContext)
  const [activeTab, setActiveTab] = useState("presidentes")
  const [data, loading, error] = useFetchPresident()
  const [dataLocations, loadingLocations, error1] = useFetchTouristicLocations(departments)
  const [dataAirports, loadingAirports, error2] = useFetchAirports(departments)
  const [airportsByDepCityType, loadingAirportsType, error3] = useFetchAirportsByDepCityType(departments, regions)

  // console.log(data)
  console.log(dataLocations)
  console.log(dataAirports)

  return (
    <React.Fragment>
      <h1>aquí irá el dashboard</h1>
      <TabComponent active={activeTab} setActiveTab={setActiveTab}></TabComponent>
      {
        loading
          ? <p>cargando...</p>

          // : <p>{data}</p>
          : <p>llegó la data</p>

      }
    </React.Fragment>
  )
}

export default ColombiaDash
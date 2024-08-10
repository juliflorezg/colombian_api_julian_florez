import React, { useContext, useEffect, useState } from 'react';
import useFetchPresident from '../hooks/useFetchPresidents';
import useFetchTouristicLocations from '../hooks/useFetchTouristicLocations';
import useFetchAirports from '../hooks/useFetchAirports';
import GlobalDataContext from '../store/globalDataContext';
import useFetchAirportsByDepCityType from '../hooks/useFetchAirportsByDepCityType';
import './TabHeader.module.css'
import TotalRegistries from './TotalRegistries';
import AllRegistriesList from './AllRegistriesList';

function TabContent({ active }) {
  console.log({ activeTab: active })
  const { departments, regions } = useContext(GlobalDataContext)
  // const [data, setData] = useState(null)
  const [data, loading, error] = useFetchPresident(active)
  // const [dataLocations, loadingLocations, error1] = useFetchTouristicLocations(departments, active)
  // const [dataAirports, loadingAirports, error2] = useFetchAirports(departments, active)
  // const [airportsByDepCityType, loadingAirportsType, error3] = useFetchAirportsByDepCityType(departments, regions)

  // useEffect(() => {
  //   console.log('active has changed')
  //   switch (active) {
  //     case "presidentes": {
  //       const [data, loading, error] = useFetchPresident()
  //       // const
  //     }
  //   }
  // }, [active])
  console.log("presidents data:", data)
  return (
    <React.Fragment>
      <p>{active}</p>
      {data !== null ?
        <TotalRegistries active={active} count={data.count}></TotalRegistries> : null
        // <p>Numero total de registros para {active}: <span>{data.count}</span></p> : null
      }
      {data != null && active === 'presidentes' ?
        <AllRegistriesList data={data.data} active={active}></AllRegistriesList>
        : null}
    </React.Fragment>
  )
}

export default TabContent
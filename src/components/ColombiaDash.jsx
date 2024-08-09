import React from 'react';
import useFetchPresident from '../hooks/useFetchPresidents';
// import logo from './logo.svg';
// import './App.css';

function ColombiaDash() {
  const [data, loading, error] = useFetchPresident()
  console.log(data)

  return (
    <React.Fragment>
      <h1>aquí irá el dashboard</h1>
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
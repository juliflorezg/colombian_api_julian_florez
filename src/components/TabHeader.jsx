import React from 'react';
// import classes from './TabHeader.module.css'
import './TabHeader.module.css'

function TabHeader({ active, setActiveTab }) {
  // const { departments, regions } = useContext(GlobalDataContext)

  return (
    <React.Fragment>
      <ul>
        <li className={active === 'presidentes' ? 'tabactive' : 'tabinactive'} onClick={() => setActiveTab('presidentes')}>Presidentes</li>
        <li className={active === 'aeropuertos' ? 'tabactive' : 'tabinactive'} onClick={() => setActiveTab('aeropuertos')}>Aeropuertos </li>
        <li className={active === 'atracciones' ? 'tabactive' : 'tabinactive'} onClick={() => setActiveTab('atracciones')}>Atracciones turísticas</li>
      </ul>
      <p>{active}</p>
    </React.Fragment>
  )
}

export default TabHeader
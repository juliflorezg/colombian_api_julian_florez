import React, { useState } from 'react';
import './TabHeader.module.css'

function TabHeader({ active, setActiveTab }) {
  // const { departments, regions } = useContext(GlobalDataContext)
  const [listItemsInfo, setListItemsInfo] = useState([
    { presidentes: "Presidentes" },
    { aeropuertos: "Aeropuertos" },
    { atracciones: "Atracciones turísticas" },
  ])

  return (
    <React.Fragment>
      <ul>
        {
          listItemsInfo.map((item) => {
            const [key, value] = Object.entries(item)[0]
            return (
              <li key={key + value} className={active === key ? 'tabactive' : 'tabinactive'} onClick={() => setActiveTab(key)}>{value}</li>
            )
          })
        }
      </ul>
      {/* <p>{active}</p> */}
    </React.Fragment>
  )
}

export default TabHeader
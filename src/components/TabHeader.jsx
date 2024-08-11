import React, { useState } from 'react';
import './TabHeader.module.css'

function TabHeader({ active, setActiveTab }) {
  // const { departments, regions } = useContext(GlobalDataContext)
  const [listItemsInfo, setListItemsInfo] = useState([
    { presidentes: "Presidentes" },
    { atracciones: "Atracciones turísticas" },
    { aeropuertos: "Aeropuertos" },
  ])

  return (
    <React.Fragment>
      <ul className='tabHeaderList'>
        {
          listItemsInfo.map((item) => {
            const [key, value] = Object.entries(item)[0]
            return (
              <li key={key + value} className={active === key ? 'tabHeaderList__listItem tabactive' : 'tabHeaderList__listItem tabinactive'} onClick={() => setActiveTab(key)}>{value}</li>
            )
          })
        }
      </ul>
      {/* <p>{active}</p> */}
    </React.Fragment>
  )
}

export default TabHeader
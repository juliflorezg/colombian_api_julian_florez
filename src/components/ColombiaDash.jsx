import React, { useState } from 'react';
import TabComponent from './TabComponent';
// import logo from './logo.svg';
// import './App.css';

function ColombiaDash() {
  const [activeTab, setActiveTab] = useState("presidentes")

  return (
    <React.Fragment>
      <h1>aquí irá el dashboard</h1>
      <TabComponent active={activeTab} setActiveTab={setActiveTab}></TabComponent>
    </React.Fragment>
  )
}

export default ColombiaDash
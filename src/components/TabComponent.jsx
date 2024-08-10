import React from 'react';

import TabHeader from './TabHeader';
import TabContent from './TabContent';
// import logo from './logo.svg';
// import './App.css';

function TabComponent({ active, setActiveTab }) {

  return (
    <React.Fragment>
      <TabHeader active={active} setActiveTab={setActiveTab}></TabHeader>
      <TabContent active={active}></TabContent>
    </React.Fragment>
  )
}

export default TabComponent
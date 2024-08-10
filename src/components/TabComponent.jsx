import React, { useContext, useState } from 'react';

import TabHeader from './TabHeader';
// import logo from './logo.svg';
// import './App.css';

function TabComponent({ active, setActiveTab }) {

  return (
    <React.Fragment>
      <TabHeader active={active} setActiveTab={setActiveTab}></TabHeader>
      {/* <Content></Content> */}
    </React.Fragment>
  )
}

export default TabComponent
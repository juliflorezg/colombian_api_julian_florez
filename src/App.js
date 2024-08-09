import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

import ColombiaDash from './components/ColombiaDash'

function App() {

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  return (
    <div className="App">
      {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div> */}

      {path === '/colombia_dash' ? (
        <ColombiaDash />
      ) : (
        <div>
          <h1 className="App-intro">
            {/* To get started, edit <code>src/App.js</code> and save to reload. */}
            para empezar ingresa al <button onClick={() => navigateTo('/colombia_dash')}>dashboard</button>
          </h1>
        </div>
      )}
    </div>
  );

}

export default App;

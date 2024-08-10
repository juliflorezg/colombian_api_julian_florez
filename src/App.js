import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

import ColombiaDash from './components/ColombiaDash'
import useFetchDepartments from './hooks/useFecthDepartments';
import GlobalDataContext from './store/globalDataContext';
import useFetchRegions from './hooks/useRegions';

function App() {

  const [path, setPath] = useState(window.location.pathname);
  const [departments, loadingDepartments, errorDep] = useFetchDepartments()
  const [regions, loadingRegions, errorRegions] = useFetchRegions()

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

  const globalContextValue = {
    departments,
    regions
  }

  return (
    <div className="App">
      <GlobalDataContext.Provider value={globalContextValue}>


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
      </GlobalDataContext.Provider>
    </div>
  );

}

export default App;

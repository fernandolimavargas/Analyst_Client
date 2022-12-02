import React, { useState } from 'react';

import GlobalContext from './contexts/global';
import AppRoutes from './AppRoutes';

const App = () => {
  const [request, setRequest] = useState();

  return (
    <div className="app">
      <GlobalContext.Provider value={{ request, setRequest }}>
        <AppRoutes />
      </GlobalContext.Provider>
    </div>
  );
};

export default App;

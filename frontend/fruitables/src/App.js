import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouter from './routes/UserRouter';
import AdminRouter from './routes/AdminRouter';
import PrivateRoute from './routes/PrivateRoute';
import { Provider } from 'react-redux';
import { storeReduces } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './Context/ThemeContext';
import { ContactProvider } from './Context/reducer/ContactContext';

function App() {
  const { store, persistor } = storeReduces()

  return (
    <ContactProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route exact path="/*" element={<UserRouter />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/admin/*" element={<AdminRouter />} />
              </Route>

            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ContactProvider>


  );
}

export default App;

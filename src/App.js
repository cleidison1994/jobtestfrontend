import 'dotenv/config';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './config/reactotronConfig';
import { Provider } from 'react-redux';
import history from './services/history';
import { store, persistor } from './store';

import GlobalStyle from './styles/GlobalStyle';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <ToastContainer />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

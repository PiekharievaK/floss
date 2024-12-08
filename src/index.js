import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider>
     <BrowserRouter>
            <App />
          </BrowserRouter>
          </ThemeProvider>
          </PersistGate>
    </Provider>
  // </React.StrictMode>
);


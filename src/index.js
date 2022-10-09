import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './styles/EstilosGlobais.css';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { armazenar } from './app/armazenar';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={armazenar}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

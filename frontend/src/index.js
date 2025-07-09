import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomThemeProvider } from './theme/CustomThemeProvider';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

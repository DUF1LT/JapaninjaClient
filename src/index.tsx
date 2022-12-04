import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

import { Colors } from 'assets/colors';
import { QueryClientProvider } from 'common/helpers/reactQuery/QueryClientProvider';
import { LocalizationContextProvider } from 'common/contexts/LocalizationContext';

import { store } from './store';
import { App } from './App';

import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.White,
      dark: Colors.White,
      light: Colors.White
    },
    secondary: {
      main: Colors.Red,
      dark: Colors.Black,
      light: Colors.LightBlack,
    },
    mode: 'dark',
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider>
        <ThemeProvider theme={theme}>
          <LocalizationContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

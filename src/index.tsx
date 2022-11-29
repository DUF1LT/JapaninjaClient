import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

import { Colors } from 'assets/colors';

import { store } from './store';
import { App } from './App';

import './index.scss';
import { QueryClientProvider } from 'common/helpers/reactQuery/QueryClientProvider';


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
    }
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

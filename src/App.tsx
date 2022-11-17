import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom'

import { Colors } from 'assets/colors';
import { ManagerPageContainer } from 'pages/manager';

import { Home } from './pages/home/HomePage';
import { Layout } from './common/components/Layout';
import { links } from './resources';


const theme = createTheme({
  palette: {
    primary: {
      main: Colors.White,
      dark: Colors.White,
      light: Colors.White
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={links.root} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={links.manager.root} element={<ManagerPageContainer />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
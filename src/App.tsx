import { createTheme, ThemeProvider } from '@mui/material';
import { Colors } from 'assets/colors';
import { Routes, Route } from 'react-router-dom'

import { Layout } from './common/components/Layout';
import { AboutUs } from './pages/aboutUs/AboutUs';
import { Home } from './pages/home/Home';
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
          <Route path={links.aboutUs} element={<AboutUs />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
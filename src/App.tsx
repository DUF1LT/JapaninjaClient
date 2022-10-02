import { Routes, Route } from 'react-router-dom'
import { Layout } from './common/components/Layout';
import { AboutUs } from './pages/aboutUs/AboutUs';
import { Home } from './pages/home/Home';
import { links } from './resources';

export function App() {
  return (
    <Routes>
      <Route path={links.root} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={links.aboutUs} element={<AboutUs />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}
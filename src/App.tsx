import { Routes, Route } from 'react-router-dom'

import { ManagerPanelContainer } from 'pages/manager/ManagerPanel';
import { ManagerMenuContainer } from 'pages/manager/ManagerMenu';

import { Home } from './pages/home/HomePage';
import { Layout } from './common/components/Layout';
import { links } from './resources';

export function App() {
  return (
    <Routes>
      <Route path={links.root} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={links.manager.root} element={<ManagerPanelContainer />} />
        <Route path={links.manager.menu} element={<ManagerMenuContainer />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}
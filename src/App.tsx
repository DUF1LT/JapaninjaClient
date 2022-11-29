import { Routes, Route } from 'react-router-dom'

import { ManagerPanelContainer } from 'pages/manager/ManagerPanel';
import { ManagerMenuContainer } from 'pages/manager/ManagerMenu';
import { Menu } from 'pages/menu/Menu';
import { useLocalizationContext } from 'common/contexts/LocalizationContext/LocalizationContext';

import { Home } from './pages/home/HomePage';
import { Layout } from './common/components/Layout';
import { links } from './resources';

export function App() {
  useLocalizationContext();

  return (
    <Routes>
      <Route path={links.root} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={links.menu.root} element={<Menu />} />
        <Route path={links.manager.root} element={<ManagerPanelContainer />} />
        <Route path={links.manager.menu} element={<ManagerMenuContainer />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}
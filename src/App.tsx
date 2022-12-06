import { Routes, Route } from 'react-router-dom'

import { ManagerPanelContainer } from 'pages/manager/ManagerPanel';
import { ManagerMenuContainer } from 'pages/manager/ManagerMenu';
import { CreateOrderContainer } from 'pages/order/CreateOrder/CreateOrderContainer';
import { OrderContainer } from 'pages/order/Order/OrderContainer';
import { Menu } from 'pages/menu/Menu';
import { Home } from 'pages/home/HomePage';
import { OrderConfirmationContainer } from 'pages/order/OrderConfimration';

import { useLocalizationContext } from 'common/contexts/LocalizationContext/LocalizationContext';

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
        <Route path={links.order.createOrder} element={<CreateOrderContainer />} />
        <Route path={links.order.root + '/:id'} element={<OrderContainer />} />
        <Route path={links.order.orderConfirmation + '/:id'} element={<OrderConfirmationContainer />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}
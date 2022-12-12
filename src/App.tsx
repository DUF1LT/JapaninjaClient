import { Routes, Route } from 'react-router-dom'

import { ManagerPanelContainer } from 'pages/manager/ManagerPanel';
import { ManagerMenuContainer } from 'pages/manager/ManagerMenu';
import { CreateOrderContainer } from 'pages/order/CreateOrder';
import { OrderContainer } from 'pages/order/Order/OrderContainer';
import { OrderConfirmationContainer } from 'pages/order/OrderConfimration';
import { CourierPanelContainer } from 'pages/courier/CourierPanel';
import { CustomerPanelContainer } from 'pages/customer/CustomerPanel';
import { HomePageContainer } from 'pages/home/HomePageContainer';

import { useLocalizationContext } from 'common/contexts/LocalizationContext/LocalizationContext';

import { Layout } from './common/components/Layout';
import { links } from './resources';

export function App() {
  useLocalizationContext();

  return (
    <Routes>
      <Route path={links.root} element={<Layout />}>
        <Route index element={<HomePageContainer />} />
        <Route path={links.menu.root} element={<HomePageContainer />} />
        <Route path={links.manager.root} element={<ManagerPanelContainer />} />
        <Route path={links.manager.menu} element={<ManagerMenuContainer />} />
        <Route path={links.order.createOrder} element={<CreateOrderContainer />} />
        <Route path={links.order.root + '/:id'} element={<OrderContainer />} />
        <Route path={links.order.orderConfirmation + '/:id'} element={<OrderConfirmationContainer />} />
        <Route path={links.courier.root} element={<CourierPanelContainer />} />
        <Route path={links.customer.root} element={<CustomerPanelContainer />} />
        <Route path='*' element={<HomePageContainer />} />
      </Route>
    </Routes>
  );
}
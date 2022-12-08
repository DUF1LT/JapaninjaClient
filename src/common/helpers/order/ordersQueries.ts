import { OrderStatus } from "models/domain/OrderStatus";

export const ordersQueries = {
    orderConfigurations: (cutomerId?: string) => ['orders', 'orderConfigurations', cutomerId],
    createOrder: (cutomerId?: string) => ['orders', 'create', cutomerId],
    processOrder: ['order', 'process'],
    cancelOrder: ['order', 'cancel'],
    setToReadyOrder: ['order', 'setToReady'],
    shipOrder: ['order', 'ship'],
    closeOrder: ['order', 'close'],
    order: (orderId: string) => ['orders', orderId],
    orders: (orderStatus: OrderStatus) => ['orders', 'status', orderStatus],
    couriersOrders: (courierId: string, orderStatus: OrderStatus) => ['orders', 'courier', courierId, 'status', orderStatus],
    customerOrders: (customerId: string, isActiveOrder: boolean) => ['orders', 'courier', customerId, 'isActiveOrders', isActiveOrder],
}
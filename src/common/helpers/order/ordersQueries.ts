import { OrderStatus } from "models/domain/OrderStatus";

export const ordersQueries = {
    orderConfigurations: (cutomerId?: string) => ['orders', 'orderConfigurations', cutomerId],
    createOrder: (cutomerId?: string) => ['orders', 'create', cutomerId],
    processOrder: ['order', 'process'],
    cancelOrder: ['order', 'cancel'],
    setToReady: ['order', 'setToReady'],
    order: (orderId: string) => ['orders', orderId],
    orders: (orderStatus: OrderStatus) => ['orders', 'status', orderStatus],
}
export const ordersQueries = {
    orderConfigurations: (cutomerId?: string) => ['orders', 'orderConfigurations', cutomerId],
    createQuery: (cutomerId?: string) => ['orders', 'create', cutomerId],
}
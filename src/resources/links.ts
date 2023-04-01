import { ProductType } from "models/domain/ProductType";

export const links = {
    root: '/',
    aboutUs: 'about-us',
    manager: {
        root: 'manager',
        menu: 'manager/menu',
        menuWithProductType: (type: ProductType) => `manager/menu?productType=${type}`,
    },
    menu: {
        root: 'menu',
        menuWithProductType: (type: ProductType) => `menu?productType=${type}`,
    },
    order: {
        root: 'order',
        orderTemplate: 'order/:id',
        createOrder: 'createOrder',
        orderConfirmation: 'orderConfirmation',
        orderConfirmationTemplate: 'orderConfirmation/:id',
        orderConfirmationWithId: (orderId: string) => `/orderConfirmation/${orderId}`,
        order: (orderId: string) => `order/${orderId}`,
    },
    courier: {
        root: 'courier',
    },
    customer: {
        root: 'customer',
    }
}
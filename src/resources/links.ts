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
        createOrder: 'createOrder',
        orderConfirmation: 'orderConfirmation',
        orderConfirmationWithId: (orderId: string) => `orderConfirmation/${orderId}`,
        order: (orderId: string) => `order/${orderId}`,
    }
}
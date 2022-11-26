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
    }
}
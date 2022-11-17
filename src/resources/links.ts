import { ProductType } from "models/domain/ProductType";

export const links = {
    root: '/',
    aboutUs: 'about-us',
    manager: {
        root: 'manager',
        menuWithProductType: (type: ProductType) => `manager/menu?type=${type}`,
    },
    menu: {
        root: 'menu',
        menuWithProductType: (type: ProductType) => `menu?type=${type}`,
    }
}
import { ProductType } from "../ProductType";

export function getAllProductTypes() {
    const productTypes = Object.entries(ProductType).map(t => t[1])

    return productTypes;
}
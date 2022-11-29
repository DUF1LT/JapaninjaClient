import { ProductType } from "models/domain/ProductType";

export const productsQueries = {
    type: (type?: ProductType | null) => ['products', 'type', type],
}
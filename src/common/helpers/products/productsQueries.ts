import { ProductType } from "models/domain/ProductType";
import { SortBy } from "models/domain/SortBy";

export const productsQueries = {
    typeWithSortBy: (type?: ProductType | null, sortBy?: SortBy | null) => ['products', 'type', type, sortBy],
}
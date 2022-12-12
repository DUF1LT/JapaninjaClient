import { Product } from "models/domain/Product";
import { ProductType } from "models/domain/ProductType";
import { ProductsService } from "services/ProductsService";
import { useQuery } from "@tanstack/react-query";
import { Error } from "services/types";

import { productsQueries } from "./productsQueries";
import { SortBy } from "models/domain/SortBy";

type Result = {
    products: Product[],
    isLoading: boolean,
    error: string | null,
    refetch: () => void;
};

export function useProducts(type?: ProductType | null, sortBy?: SortBy | null): Result {
    const { data, isLoading, error, refetch } = useQuery<Product[], Error>(
        productsQueries.typeWithSortBy(type, sortBy),
        () => ProductsService.getProducts(type, sortBy),
        {
            retry: 3,
        });

    return {
        products: data ?? [],
        isLoading,
        error: error?.error ?? null,
        refetch,
    };
}
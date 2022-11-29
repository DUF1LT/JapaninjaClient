import { Product } from "models/domain/Product";
import { ProductType } from "models/domain/ProductType";
import { ProductsService } from "services/ProductsService";
import { useQuery } from "@tanstack/react-query";
import { Error } from "services/types";

import { productsQueries } from "./productsQueries";

type Result = {
    products: Product[],
    isLoading: boolean,
    error: string | null,
};

export function useProducts(type?: ProductType | null): Result {
    const { data, isLoading, error } = useQuery<Product[], Error>(
        productsQueries.type(type),
        () => ProductsService.getProducts(type),
        {
            keepPreviousData: true,
            retry: 3,
        });

    return {
        products: data ?? [],
        isLoading,
        error: error?.error ?? null,
    };
}
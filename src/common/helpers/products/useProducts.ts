import { useEffect, useMemo, useState } from "react";

import { Product } from "models/domain/Product";
import { ProductType } from "models/domain/ProductType";
import { ProductsService } from "services/ProductsService";

type Result = [
    products: Product[],
    isLoading: boolean,
    error: string | null,
]

export function useProducts(type?: ProductType | null, dependencies?: boolean[]): Result {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>('');

    const useEffectDeps = useMemo(() => [type, ...(dependencies ?? [])], [type, dependencies]);

    useEffect(() => {
        const getProducts = async () => {
            setError('');
            setIsLoading(true);

            var result = await ProductsService.getProducts(type);

            if ('error' in result) {
                setError(result.error);
                setIsLoading(false);

                return;
            }

            setProducts(result);
            setIsLoading(false);
        }

        getProducts();
    }, useEffectDeps);

    return [products, isLoading, error];
}
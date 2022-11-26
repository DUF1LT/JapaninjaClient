import { useCallback, useState } from "react";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { ManagerService } from "services/ManagerService";
import { localization } from "resources";

type Result = [
    onCreateProduct: (payload: ProductFormPayload) => void,
    isLoading: boolean,
    error: string | null,
];

export function useCreateProduct(
    onSuccess: () => void,
): Result {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onCreateProduct = useCallback(async (payload: ProductFormPayload) => {
        setError('');
        setIsLoading(true);

        try {
            const createProductResult = await ManagerService.createProduct(payload);

            if (createProductResult !== true) {
                setIsLoading(false);
                setError(createProductResult.error)

                return;
            }

            setIsLoading(false);
            onSuccess?.();
        }
        catch (e) {
            setIsLoading(false);
            setError(localization.somethingWentWrong)
        }

    }, [onSuccess]);

    return [onCreateProduct, isLoading, error];
};  
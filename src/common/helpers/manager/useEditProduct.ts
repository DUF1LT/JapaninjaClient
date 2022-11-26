import { useCallback, useState } from "react";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { ManagerService } from "services/ManagerService";
import { localization } from "resources";

type Result = [
    onEditProduct: (payload: ProductFormPayload) => void,
    isLoading: boolean,
    error: string | null,
];

export function useEditProduct(
    onSuccess: () => void,
): Result {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onEditProduct = useCallback(async (payload: ProductFormPayload) => {
        setError('');
        setIsLoading(true);

        try {
            const editProductResult = await ManagerService.editProduct(payload);

            if (editProductResult !== true) {
                setIsLoading(false);
                setError(editProductResult.error)

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

    return [onEditProduct, isLoading, error];
};  
import { useCallback, useState } from "react";

import { ManagerService } from "services/ManagerService";
import { localization } from "resources";

type Result = [
    onDeleteProduct: (id: string) => void,
    isLoading: boolean,
    error: string | null,
];

export function useDeleteProduct(
    onSuccess: () => void,
): Result {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onDeleteProduct = useCallback(async (id: string) => {
        setError('');
        setIsLoading(true);

        try {
            const deleteProductResult = await ManagerService.deleteProduct(id);

            if (deleteProductResult !== true) {
                setIsLoading(false);
                setError(deleteProductResult.error)

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

    return [onDeleteProduct, isLoading, error];
};  
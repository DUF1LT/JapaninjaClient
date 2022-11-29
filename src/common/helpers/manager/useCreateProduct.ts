import { useMutation } from "@tanstack/react-query";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { ManagerService } from "services/ManagerService";
import { Error } from "services/types";

import { managerQueries } from "./managerQueries";

type Result = {
    onCreateProduct: (payload: ProductFormPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export function useCreateProduct(
    onSuccess: () => void,
): Result {
    const { mutate, isLoading, error } = useMutation<void, Error, ProductFormPayload>(
        managerQueries.create,
        (payload: ProductFormPayload) => ManagerService.createProduct(payload),
        {
            onSuccess: onSuccess,
        },
    );

    return {
        onCreateProduct: mutate,
        isLoading,
        error: error?.error ?? null,
    };
};  
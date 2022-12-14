import { useMutation } from "@tanstack/react-query";

import { ManagerService } from "services/ManagerService";
import { Error } from "services/types";

import { managerQueries } from "./managerQueries";

type Result = {
    onDeleteProduct: (id: string) => void,
    isLoading: boolean,
    error: string | null,
};

export function useDeleteProduct(
    onSuccess: () => void,
): Result {
    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        managerQueries.delete,
        (id: string) => ManagerService.deleteProduct(id),
        {
            onSuccess: onSuccess,
        },
    );


    return {
        onDeleteProduct: mutate,
        isLoading,
        error: error?.error ?? null,
    };
};  
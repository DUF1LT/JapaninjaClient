import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CouriersService } from "services/CouriersService";
import { Error } from "services/types";

import { couriersQueries } from "./couriersQueries";

type Result = {
    onFireCourier: (id: string) => void,
    isLoading: boolean,
    error: string | null,
};

export const useFireCourier = (
    onSuccess?: () => void
): Result => {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        (id: string) => CouriersService.fireCourier(id),
        {
            onSuccess: () => {
                onSuccess?.();
                client.invalidateQueries(couriersQueries.couriers);
            },
        },
    );

    return {
        onFireCourier: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
import { useMutation } from "@tanstack/react-query";

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
    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        couriersQueries.fire,
        (id: string) => CouriersService.fireCourier(id),
        {
            onSuccess: onSuccess,
        },
    );

    return {
        onFireCourier: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RegisterCourierFormPayload } from "pages/manager/ManagerPanel/components/CouriersPanel/components/RegisterCourierForm/types";
import { CouriersService } from "services/CouriersService";
import { Error } from "services/types";

import { couriersQueries } from "./couriersQueries";

type Result = {
    onRegisterCourier: (payload: RegisterCourierFormPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export const useRegisterCourier = (
    onSuccess?: () => void
): Result => {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, RegisterCourierFormPayload>(
        (payload: RegisterCourierFormPayload) => CouriersService.registerCourier(payload),
        {
            onSuccess: () => {
                onSuccess?.();
                client.invalidateQueries(couriersQueries.couriers);
            },
        },
    );

    return {
        onRegisterCourier: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
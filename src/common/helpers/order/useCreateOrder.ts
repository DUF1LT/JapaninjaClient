import { useMutation } from "@tanstack/react-query";

import { CreateOrderPayload, OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onCreateOrder: (payload: CreateOrderPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export function useCreateOrder(onSuccess?: () => void): Result {
    const { mutate, isLoading, error } = useMutation<void, Error, CreateOrderPayload>(
        ordersQueries.createQuery('a'),
        (payload: CreateOrderPayload) => OrdersService.createOrder(payload),
        {
            onSuccess: onSuccess,
        },
    );

    return {
        onCreateOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
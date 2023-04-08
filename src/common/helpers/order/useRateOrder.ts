import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onRateOrder: (rating: number, feedback: string) => void;
    isLoading: boolean;
    error: string | null;
};

type RateMutate = {
    rating: number;
    feedback: string;
}

export function useRateOrder(orderId: string): Result {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, RateMutate>(
        (payload: RateMutate) => OrdersService.rateOrder(orderId, payload.rating, payload.feedback),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.order(orderId));
            }
        },
    );

    const onRateOrder = (rating: number, feedback: string) => {
        mutate({ rating, feedback });
    }

    return {
        onRateOrder,
        isLoading,
        error: error?.error ?? null,
    };
}
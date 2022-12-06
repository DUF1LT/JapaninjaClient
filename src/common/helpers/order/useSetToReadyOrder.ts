import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onSetToReady: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
};

export function useSetToReadyOrder(): Result {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.setToReady,
        (orderId: string) => OrdersService.setToReadyOrder(orderId),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.orders(OrderStatus.Preparing));
            }
        },
    );

    return {
        onSetToReady: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
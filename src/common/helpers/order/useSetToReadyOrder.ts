import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onSetToReadyOrder: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
};

export function useSetToReadyOrder(): Result {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.setToReadyOrder,
        (orderId: string) => OrdersService.setToReadyOrder(orderId),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.orders(OrderStatus.Preparing));
            }
        },
    );

    return {
        onSetToReadyOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onProcessOrder: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
};

export function useProcessOrder(): Result {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.processOrder,
        (orderId: string) => OrdersService.processOrder(orderId),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.orders(OrderStatus.Processing));
            }
        },
    );

    return {
        onProcessOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
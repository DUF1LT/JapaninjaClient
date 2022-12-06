import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onCancelOrder: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
}

export function useCancelOrder(orderStatus: OrderStatus): Result {
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.processOrder,
        (orderId: string) => OrdersService.cancelOrder(orderId),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.orders(orderStatus));
            }
        },
    );

    return {
        onCancelOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
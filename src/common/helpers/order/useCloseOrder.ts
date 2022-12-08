import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { Role } from "models/response/AuthData";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onCloseOrder: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
};

export function useCloseOrder(orderStatus: OrderStatus): Result {
    const auth = useAppSelector(s => s.auth.authData);
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.closeOrder,
        (orderId: string) => OrdersService.closeOrder(orderId),
        {
            onSuccess: () => {
                if (auth.role === Role.Manager) {
                    client.invalidateQueries(ordersQueries.orders(orderStatus));
                }

                if (auth.role === Role.Courier) {
                    client.invalidateQueries(ordersQueries.couriersOrders(auth.id!, orderStatus));
                }
            }
        },
    );

    return {
        onCloseOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
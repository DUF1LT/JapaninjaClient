import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onShipOrder: (orderId: string) => void;
    isLoading: boolean;
    error: string | null;
};

export function useShipOrder(): Result {
    const auth = useAppSelector(s => s.auth.authData);
    const client = useQueryClient();

    const { mutate, isLoading, error } = useMutation<void, Error, string>(
        ordersQueries.shipOrder,
        (orderId: string) => OrdersService.shipOrder(orderId),
        {
            onSuccess: () => {
                client.invalidateQueries(ordersQueries.couriersOrders(auth.id!, OrderStatus.Ready));
            }
        },
    );

    return {
        onShipOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
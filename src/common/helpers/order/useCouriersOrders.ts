import { useQuery } from "@tanstack/react-query";

import { Order } from "models/domain/Order";
import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";

import { ordersQueries } from "./ordersQueries";


type Result = {
    courierOrders: Order[],
    isLoading: boolean,
    error: string | null,
};

export function useCouriersOrders(orderStatus: OrderStatus): Result {
    const auth = useAppSelector(s => s.auth.authData);

    const { data, isLoading, error } = useQuery<Order[], Error>(
        ordersQueries.couriersOrders(auth.id!, orderStatus),
        () => OrdersService.getCouriersOrders(auth.id!, orderStatus),
        {
            retry: 3,
        }
    );

    return {
        courierOrders: data ?? [],
        isLoading,
        error: error?.error ?? null,
    };
}
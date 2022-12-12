import { useQuery } from "@tanstack/react-query";

import { Order } from "models/domain/Order";
import { OrderStatus } from "models/domain/OrderStatus";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";


type Result = {
    orders: Order[],
    isLoading: boolean,
    error: string | null,
};

export function useOrders(orderStatus: OrderStatus): Result {
    const { data, isLoading, error } = useQuery<Order[], Error>(
        ordersQueries.orders(orderStatus),
        () => OrdersService.getOrders(orderStatus),
        {
            retry: 3,
        }
    );


    return {
        orders: data ?? [],
        isLoading: isLoading,
        error: error?.error ?? null,
    };
}
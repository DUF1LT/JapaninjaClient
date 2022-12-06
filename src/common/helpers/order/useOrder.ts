import { useQuery } from "@tanstack/react-query";

import { Order } from "models/domain/Order";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";

import { ordersQueries } from "./ordersQueries";


type Result = {
    order: Order,
    isLoading: boolean,
    error: string | null,
};

export function useOrder(orderId: string): Result {
    const { data, isLoading, error } = useQuery<Order, Error>(
        ordersQueries.order(orderId),
        () => OrdersService.getOrder(orderId),
        {
            retry: 3,
        }
    );

    return {
        order: data!,
        isLoading,
        error: error?.error ?? null,
    };
}
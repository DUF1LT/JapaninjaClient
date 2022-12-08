import { useQuery } from "@tanstack/react-query";

import { Order } from "models/domain/Order";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";

import { ordersQueries } from "./ordersQueries";


type Result = {
    customerOrders: Order[],
    isLoading: boolean,
    error: string | null,
};

export function useCustomerOrders(isActiveOrders: boolean): Result {
    const auth = useAppSelector(s => s.auth.authData);

    const { data, isLoading, error } = useQuery<Order[], Error>(
        ordersQueries.customerOrders(auth.id!, isActiveOrders),
        () => OrdersService.getCustomerOrders(auth.id!, isActiveOrders),
        {
            retry: 3,
        }
    );

    return {
        customerOrders: data ?? [],
        isLoading,
        error: error?.error ?? null,
    };
}
import { useQuery } from "@tanstack/react-query";
import { OrderConfiguration } from "models/domain/OrderConfiguration";
import { OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { useAppSelector } from "store/hooks";
import { ordersQueries } from "./ordersQueries";

type Result = {
    orderConfiguration: OrderConfiguration,
    isLoading: boolean,
    error: string | null,
}

export function useOrderConfiguration(): Result {
    const auth = useAppSelector(s => s.auth.authData);
    const customerId = auth?.id;

    const { data, isLoading, error } = useQuery<OrderConfiguration, Error>(
        ordersQueries.orderConfigurations(customerId),
        () => OrdersService.getOrderConfiguration(customerId),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 3,
        }
    );

    return {
        orderConfiguration: data!,
        isLoading,
        error: error?.error ?? null,
    };
}
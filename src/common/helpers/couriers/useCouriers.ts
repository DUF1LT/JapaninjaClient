import { useQuery } from "@tanstack/react-query";

import { Courier } from "models/domain/Courier";
import { CouriersService } from "services/CouriersService";
import { Error } from "services/types";

import { couriersQueries } from "./couriersQueries";

type Result = {
    couriers: Courier[],
    refetch: () => void,
    isLoading: boolean,
    error: string | null,
};

export function useCouriers(): Result {
    const { data, isLoading, refetch, error } = useQuery<Courier[], Error>(
        couriersQueries.couriers,
        () => CouriersService.getCouriers(),
        {
            retry: 3,
        });

    return {
        couriers: data ?? [],
        refetch,
        isLoading,
        error: error?.error ?? null,
    };
}
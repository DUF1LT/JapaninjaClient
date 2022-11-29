import { useQuery } from "@tanstack/react-query";

import { Courier } from "models/domain/Courier";
import { CouriersService } from "services/CouriersService";
import { Error } from "services/types";

import { couriersQueries } from "./couriersQueries";

type Result = {
    couriers: Courier[],
    isLoading: boolean,
    error: string | null,
};

export function useCouriers(): Result {
    const { data, isLoading, error } = useQuery<Courier[], Error>(
        couriersQueries.couriers,
        () => CouriersService.getCouriers(),
        {
            keepPreviousData: true,
        });

    return {
        couriers: data ?? [],
        isLoading,
        error: error?.error ?? null,
    };
}
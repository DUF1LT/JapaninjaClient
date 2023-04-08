import { useQuery } from "@tanstack/react-query";

import { CourierDetailed } from "models/domain/Courier";
import { CouriersService } from "services/CouriersService";
import { Error } from "services/types";

import { couriersQueries } from "./couriersQueries";
import { useAppSelector } from "store/hooks";

type Result = {
    courier?: CourierDetailed,
    isLoading: boolean,
    error: string | null,
};

export function useCourier(): Result {
    const { id } = useAppSelector(s => s.auth.authData);

    const { data, isLoading, error } = useQuery<CourierDetailed, Error>(
        couriersQueries.courier(id!),
        () => CouriersService.getCourier(id!),
        {
            retry: 3,
        });

    return {
        courier: data,
        isLoading,
        error: error?.error ?? null,
    };
}
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { links } from "resources";

import { CreateOrderPayload, OrdersService } from "services/OrdersService";
import { Error } from "services/types";
import { clearCart } from "store/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { ordersQueries } from "./ordersQueries";

type Result = {
    onCreateOrder: (payload: CreateOrderPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export function useCreateOrder(onSuccess?: () => void): Result {
    const navigate = useNavigate();
    const auth = useAppSelector(s => s.auth.authData);
    const dispatch = useAppDispatch();
    const customerId = auth?.id;

    const { mutate, isLoading, error } = useMutation<string, Error, CreateOrderPayload>(
        ordersQueries.createOrder(customerId),
        (payload: CreateOrderPayload) => OrdersService.createOrder(payload),
        {
            onSuccess: (data) => {
                dispatch(clearCart())
                navigate(links.order.orderConfirmationWithId(data));
            }
        },
    );

    return {
        onCreateOrder: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
import { useMemo } from "react";
import { CartState } from "store/cartSlice";
import { useAppSelector } from "store/hooks";

type Result = {
    cart: CartState;
    cartSum: number;
}

export function useCart(): Result {
    const cart = useAppSelector(s => s.cart.cart);

    const cartSum = useMemo(() => cart.products.reduce((p, c) => p + (c.product.price * c.amount), 0), [cart]);
    const fixedCartSum = Number(cartSum?.toFixed(2));

    return {
        cart: cart,
        cartSum: fixedCartSum,
    };
}
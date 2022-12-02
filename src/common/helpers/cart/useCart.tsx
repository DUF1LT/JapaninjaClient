import { CartProduct } from "models/domain/CartProduct";
import { useMemo } from "react";

import { useAppSelector } from "store/hooks";

type Result = {
    cart: CartProduct[];
    cartSum: number;
}

export function useCart(): Result {
    const cart = useAppSelector(s => s.cart.cart);

    const cartSum = useMemo(() => cart.reduce((p, c) => p + (c.product.price * c.amount), 0), [cart]);
    const fixedCartSum = Number(cartSum.toFixed(2));

    return {
        cart,
        cartSum: fixedCartSum,
    };
}
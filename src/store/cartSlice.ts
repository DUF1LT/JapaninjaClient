import { createSlice } from "@reduxjs/toolkit";

import { CartProduct } from "models/domain/CartProduct";

const initializeData = (): CartProduct[] => {
    return [];
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: initializeData(),
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.find(p => p.product.id === product.id);

            if (existingProduct) {
                existingProduct.amount++;
            } else {
                state.cart.push({ product: product, amount: 1 });
            }
        },
        removeFromCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.find(p => p.product.id === product.id);

            if (!existingProduct) {
                return;
            }

            if (existingProduct.amount === 1) {
                state.cart = state.cart.filter(p => p.product.id !== product.id);
            } else {
                existingProduct.amount--;
            }
        },
        removeAllFromCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.find(p => p.product.id === product.id);

            if (!existingProduct) {
                return;
            }

            state.cart = state.cart.filter(p => p.product.id !== product.id);
        },
        clearCart(state) {
            state.cart = []
        }
    }
});

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
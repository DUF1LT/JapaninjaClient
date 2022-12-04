import { createSlice } from "@reduxjs/toolkit";
import { CartCutlery } from "models/domain/CartCutlery";

import { CartProduct } from "models/domain/CartProduct";

export type CartState = {
    products: CartProduct[],
    cutlery: CartCutlery[],
}

const initializeData = (): CartState => {
    return {
        products: [],
        cutlery: [],
    };
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: initializeData(),
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.products.find(p => p.product.id === product.id);

            if (existingProduct) {
                existingProduct.amount++;
            } else {
                state.cart.products.push({ product: product, amount: 1 });
            }
        },
        removeFromCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.products.find(p => p.product.id === product.id);

            if (!existingProduct) {
                return;
            }

            if (existingProduct.amount === 1) {
                state.cart.products = state.cart.products.filter(p => p.product.id !== product.id);
            } else {
                existingProduct.amount--;
            }
        },
        removeAllFromCart(state, action) {
            const product = action.payload!;
            const existingProduct = state.cart.products.find(p => p.product.id === product.id);

            if (!existingProduct) {
                return;
            }

            state.cart.products = state.cart.products.filter(p => p.product.id !== product.id);
        },
        setAvailableCutlery(state, action) {
            const cutlery = action.payload!;
            if (state.cart.cutlery.length === 0) {
                state.cart.cutlery = cutlery;
            }
        },
        addCutleryToCart(state, action) {
            const cartCutlery = action.payload!;
            const existingCutlery = state.cart.cutlery.find(c => c.cutlery.id === cartCutlery.cutlery.id);

            if (!existingCutlery) {
                return;
            }

            existingCutlery.amount++;
        },
        removeCutleryFromCart(state, action) {
            const cartCutlery = action.payload!;
            const existingCutlery = state.cart.cutlery.find(c => c.cutlery.id === cartCutlery.cutlery.id);

            if (!existingCutlery || existingCutlery.amount === 0) {
                return;
            }

            existingCutlery.amount--;
        },
        clearCart(state) {
            state.cart = {
                products: [],
                cutlery: [],
            };
        }
    }
});

export const { addToCart, removeFromCart, removeAllFromCart, clearCart, setAvailableCutlery, addCutleryToCart, removeCutleryFromCart } = cartSlice.actions;
export default cartSlice.reducer;
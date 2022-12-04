import { useMemo } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Product } from "models/domain/Product";
import { localization } from "resources";
import { addToCart, removeFromCart } from "store/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Button } from "../Button";

import styles from './CartButton.module.scss';


interface Props {
    product: Product;
}

export function CartButton({
    product
}: Props) {
    const cart = useAppSelector(s => s.cart.cart);
    const dispatch = useAppDispatch();

    const productInCart = useMemo(() => cart.products.find(c => c.product.id === product.id), [product, cart])

    if (productInCart) {
        return (
            <div className={styles["cart-button"]}>
                <button className={styles.control} onClick={() => dispatch(removeFromCart(product))}>
                    <RemoveIcon width={9} />
                </button>
                <span className={styles.amount}>{productInCart.amount}</span>
                <button className={styles.control} onClick={() => dispatch(addToCart(product))}>
                    <AddIcon width={9} />
                </button>
            </div>
        )
    }

    return (
        <Button
            onClick={() => dispatch(addToCart(product))}
            filled
        >
            {localization.addToCart}
        </Button>
    );
}
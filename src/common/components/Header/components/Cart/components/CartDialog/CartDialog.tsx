import { Dialog, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { dialogStyles } from "common/components/Form/styles";
import { Button } from "common/components/Button";
import { links, localization } from "resources";
import { useAppDispatch } from "store/hooks";
import { CartItem } from "../CartItem";

import styles from './CartDialog.module.scss';
import { useCart } from "common/helpers/cart/useCart";
import { clearCart } from "store/cartSlice";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDialog({
    isOpen,
    onClose,
}: Props) {
    const navigate = useNavigate();

    const { cart, cartSum } = useCart();
    const dispatch = useAppDispatch();

    const renderCartModalContent = () => {
        if (cart.length === 0) {
            return (
                <div className={styles['cart-stub']}>
                    <span className={styles['cart-stub-title']}>{localization.yourCartIsEmpty}</span>
                    <Button
                        filled
                        onClick={() => {
                            onClose()
                            navigate(links.menu.root);
                        }}
                    >
                        {localization.goToMenu}
                    </Button>
                </div>
            );
        }

        return (
            <div className={styles['cart-modal-content']}>
                <div className={styles['cart-items']}>
                    {cart.map(c => (
                        <CartItem
                            key={c.product.id}
                            cartProduct={c}
                        />
                    ))}
                </div>
                <Divider className={styles['cart-modal-divider']} />
                <div className={styles['cart-menu']}>
                    <div className={styles['cart-modal-price']}>
                        <span>
                            {localization.orderSum}
                        </span>
                        <span className={styles['cart-modal-price-sum']}>
                            {cartSum} р.
                        </span>
                    </div>
                    <div className={styles['cart-options']}>
                        <span
                            className={styles['cart-clear-cart']}
                            onClick={() => dispatch(clearCart())}
                        >
                            {localization.clearCart}
                        </span>
                        <Button
                            filled
                        >
                            {localization.checkout}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Dialog
            maxWidth='xl'
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['cart-modal-paper'],
            }}
        >
            {renderCartModalContent()}
        </Dialog>
    );
}
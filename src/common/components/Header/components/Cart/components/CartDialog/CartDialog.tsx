import { Dialog, Divider } from "@mui/material";

import { dialogStyles } from "common/components/Form/styles";
import { Button } from "common/components/Button";
import { localization } from "resources";
import { useAppDispatch } from "store/hooks";
import { useCart } from "common/helpers/cart/useCart";
import { clearCart } from "store/cartSlice";

import { CartItem } from "../CartItem";

import styles from './CartDialog.module.scss';



interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreateOrderClick: () => void;
    onMoveToMenuClick: () => void;
}

export function CartDialog({
    isOpen,
    onClose,
    onCreateOrderClick,
    onMoveToMenuClick,
}: Props) {
    const { cart, cartSum } = useCart();
    const dispatch = useAppDispatch();

    const renderCartModalContent = () => {
        if (cart.products.length === 0) {
            return (
                <div className={styles['cart-stub']}>
                    <span className={styles['cart-stub-title']}>{localization.yourCartIsEmpty}</span>
                    <Button
                        filled
                        onClick={onMoveToMenuClick}
                    >
                        {localization.goToMenu}
                    </Button>
                </div>
            );
        }

        return (
            <div className={styles['cart-modal-content']}>
                <div className={styles['cart-items']}>
                    {cart.products.map(c => (
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
                            {cartSum} {localization.rubles}
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
                            onClick={onCreateOrderClick}
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
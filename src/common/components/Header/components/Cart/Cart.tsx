import { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Divider } from '@mui/material';

import { useCart } from 'common/helpers/cart/useCart';
import { Button } from "common/components/Button";

import { CartDialog } from './components/CartDialog';


import styles from './Cart.module.scss';



export function Cart() {
    const [isCartDialogOpen, setIsCartDialogOpen] = useState<boolean>(false);

    const { cartSum } = useCart();

    return (
        <>
            <Button
                className={styles['cart']}
                filled
                onClick={() => setIsCartDialogOpen(true)}
            >
                <ShoppingCartOutlinedIcon />
                <Divider
                    className={styles['cart-divider']}
                    orientation='vertical'
                />
                <div className={styles['cart-price']}>
                    {cartSum} р.
                </div>
            </Button>
            <CartDialog
                isOpen={isCartDialogOpen}
                onClose={() => setIsCartDialogOpen(false)}
            />
        </>
    );
}
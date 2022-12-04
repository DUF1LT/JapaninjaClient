import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Divider } from '@mui/material';

import { useCart } from 'common/helpers/cart/useCart';
import { Button } from "common/components/Button";
import { links, localization } from 'resources';

import { CartDialog } from './components/CartDialog';


import styles from './Cart.module.scss';



export function Cart() {
    const navigate = useNavigate();

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
                    {cartSum} {localization.rubles}
                </div>
            </Button>
            <CartDialog
                isOpen={isCartDialogOpen}
                onClose={() => setIsCartDialogOpen(false)}
                onMoveToMenuClick={() => {
                    setIsCartDialogOpen(false);
                    navigate(links.menu.root)
                }}
                onCreateOrderClick={() => {
                    setIsCartDialogOpen(false);
                    navigate(links.order.createOrder)
                }}
            />
        </>
    );
}
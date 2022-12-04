
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { CartCutlery } from 'models/domain/CartCutlery';
import { addCutleryToCart, removeCutleryFromCart } from 'store/cartSlice';
import { useAppDispatch } from 'store/hooks';

import styles from './CutleryItem.module.scss';

interface Props {
    cartCutlery: CartCutlery;
}

export function CutlertyItem({
    cartCutlery,
}: Props) {
    const dispatch = useAppDispatch();

    return (
        <div className={styles['cart-cutlery-item']}>
            <span>{cartCutlery.cutlery.name}</span>
            <div className={styles["cart-cutlery-button"]}>
                <button className={styles.control} onClick={() => dispatch(removeCutleryFromCart(cartCutlery))}>
                    <RemoveIcon width={9} />
                </button>
                <span className={styles.amount}>{cartCutlery.amount}</span>
                <button className={styles.control} onClick={() => dispatch(addCutleryToCart(cartCutlery))}>
                    <AddIcon width={9} />
                </button>
            </div>
        </div>
    );
}
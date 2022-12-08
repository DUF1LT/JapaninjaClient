import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import classNames from 'classnames';

import { CartButton } from "common/components/CartButton";
import { CartProduct } from "models/domain/CartProduct";
import { localization } from "resources";
import { removeAllFromCart } from 'store/cartSlice';
import { useAppDispatch } from 'store/hooks';

import styles from './CartItem.module.scss';


interface Props {
    cartProduct: CartProduct;
    showImage?: boolean;
    minified?: boolean;
    disableActions?: boolean;
}

export function CartItem({
    cartProduct,
    showImage = true,
    minified = false,
    disableActions = false,
}: Props) {
    const productInCartPrice = Number((cartProduct.product.price * cartProduct.amount).toFixed(2));
    const dispatch = useAppDispatch();

    return (
        <div className={classNames({
            [styles['cart-item']]: !minified,
            [styles['cart-item-minified']]: minified,
        }
        )}>
            <div className={styles['cart-item-info']}>
                {showImage && <img
                    className={styles['cart-item-image']}
                    src={cartProduct.product.image}
                    alt=''
                />}
                <div className={styles['cart-item-name-and-price']}>
                    <span className={styles['cart-item-name']}>{cartProduct.product.name}</span>
                    <span>{cartProduct.amount} {localization.pieces}</span>
                </div>
            </div>
            {!disableActions
                ? (
                    <div className={styles['cart-item-actions']}>
                        <span className={styles['cart-item-price']}>{productInCartPrice} {localization.rubles}</span>
                        <CartButton product={cartProduct.product} />
                        <DeleteOutlineOutlinedIcon
                            className={styles['cart-item-delete']}
                            onClick={() => dispatch(removeAllFromCart(cartProduct.product))}
                        />
                    </div>
                )
                : (
                    <div className={styles['cart-item-price']}>{productInCartPrice} {localization.rubles}</div>
                )}
        </div>
    );
}
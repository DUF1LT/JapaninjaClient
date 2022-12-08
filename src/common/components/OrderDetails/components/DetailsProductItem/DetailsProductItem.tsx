import { OrdersProduct } from "models/domain/OrdersProduct";
import { localization } from "resources";

import styles from './DetailsProductItem.module.scss';

interface Props {
    orderProduct: OrdersProduct;
}

export function DetailsProductItem({
    orderProduct,
}: Props) {
    return (
        <div className={styles['details-product-item']}>
            <img
                className={styles['details-product-item-image']}
                src={orderProduct.product.image}
                alt=''
            />
            <div className={styles['details-product-item-name-and-price']}>
                <span className={styles['details-product-item-name']}>{orderProduct.product.name}</span>
                <span>{orderProduct.amount} {localization.pieces}</span>
            </div>
            <div className={styles['details-product-item-price']}>{orderProduct.product.price} {localization.rubles}</div>
        </div>
    )
}
import { CartItem } from "common/components/Header/components/Cart/components/CartItem";
import { CartProduct } from "models/domain/CartProduct";
import { localization } from "resources";

import styles from './OrderProductsSection.module.scss';

interface Props {
    cartProducts: CartProduct[];
};

export function OrderProductsSection({
    cartProducts
}: Props) {

    if (cartProducts.length === 0) {
        return (
            <div className={styles['order-products-section-stub']}>
                {localization.yourCartIsEmpty}
            </div>
        )
    }

    return (
        <div className={styles['order-products-section']}>
            {cartProducts.map(p => (
                <CartItem
                    key={p.product.id}
                    cartProduct={p}
                    minified
                    disableActions
                />
            ))}
        </div>
    );
}
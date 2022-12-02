import { Container } from "@mui/system";
import { CartButton } from "common/components/CartButton";
import { ProductItem } from "common/components/ProductItem";
import { useProducts } from "common/helpers/products/useProducts";
import { useSelectedMenuType } from "common/hooks/useSelectedMenuType";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { Product } from "models/domain/Product";
import { localization } from "resources";

import styles from './Menu.module.scss';

const renderProductItemAction = (product: Product) => {
    return (
        <div className={styles['product-item-cart']}>
            <CartButton product={product} />
        </div>
    );
};

export function Menu() {
    const selectedType = useSelectedMenuType();
    const { products, isLoading } = useProducts(selectedType);

    const renderMenu = () => {
        if (isLoading) {
            return (
                <div className={styles['menu-stub']}>
                    {localization.loading}
                </div>
            );
        }

        if (products?.length === 0) {
            return (
                <div className={styles['menu-stub']}>
                    {localization.thereAreNoProductsOfType(getStringByProductType(selectedType!))}
                </div>
            );
        }

        return (
            <div className={styles['menu-content']}>
                {products.map(p => (
                    <ProductItem
                        key={p.id}
                        product={p}
                        actions={renderProductItemAction(p)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles['menu']}>
            <div className={styles['menu-filter']}>

            </div>
            <Container>
                {renderMenu()}
            </Container >
        </div >
    );
}
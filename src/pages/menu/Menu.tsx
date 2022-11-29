import { Container } from "@mui/system";
import { ProductItem } from "common/components/ProductItem";
import { useProducts } from "common/helpers/products/useProducts";
import { useSelectedMenuType } from "common/hooks/useSelectedMenuType";
import { localization } from "resources";

import styles from './Menu.module.scss';


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
                    {localization.thereAreNoProducts}
                </div>
            );
        }

        return (
            <div className={styles['menu-content']}>
                {products.map(p => (
                    <ProductItem product={p} />
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
import { Container } from "@mui/system";
import { CartButton } from "common/components/CartButton";
import { ProductItem } from "common/components/ProductItem";
import { getEnumMembers } from "common/helpers/getEnumMembers";
import { useProducts } from "common/helpers/products/useProducts";
import { useSelectedMenuType } from "common/hooks/useSelectedMenuType";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { Product } from "models/domain/Product";
import { SortBy, SortByDirection, SortByField } from "models/domain/SortBy";
import { useState } from "react";
import { localization } from "resources";
import { SortByItem } from "./components/SortByItem";

import styles from './Menu.module.scss';

const renderProductItemAction = (product: Product) => {
    return (
        <div className={styles['product-item-cart']}>
            <CartButton product={product} />
        </div>
    );
};

const sortByFields = getEnumMembers(SortByField)

export function Menu() {
    const selectedType = useSelectedMenuType();
    const [sortBy, setSortBy] = useState<SortBy | null>(null);
    const { products, isLoading } = useProducts(selectedType, sortBy);

    const onSortItemClick = (sortByField: SortByField) => {
        if (sortBy === null || sortBy.field !== sortByField) {
            setSortBy({ field: sortByField, direction: SortByDirection.Ascending });
            return;
        }

        if (sortBy.direction === SortByDirection.Ascending) {
            setSortBy({ field: sortByField, direction: SortByDirection.Descending });
            return;
        }

        if (sortBy.direction === SortByDirection.Descending) {
            setSortBy(null);
            return;
        }
    };

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
        <Container>
            <div className={styles['menu']}>
                <div className={styles['menu-filter']}>
                    <span>{localization.sortBy}: </span>
                    {sortByFields.map(s => (
                        <SortByItem
                            key={s}
                            sortField={s}
                            sortDirection={sortBy?.field === s ? sortBy?.direction : undefined}
                            onClick={() => onSortItemClick(s)}
                        />
                    ))}
                </div>
                {renderMenu()}
            </div >
        </Container >
    );
}
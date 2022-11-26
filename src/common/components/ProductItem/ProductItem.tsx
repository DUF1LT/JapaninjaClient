import React from 'react';

import { Product } from 'models/domain/Product';

import { ItemCard } from '../ItemCard';

import styles from './ProductItem.module.scss';


interface Props {
    product: Product;
    actions?: JSX.Element;
}

export function ProductItem({
    product,
    actions,
}: Props) {
    return (
        <ItemCard className={styles['product-item']}>
            <div className={styles['product-item-header']}>
                <span>
                    {product.name}
                </span>
                <span>
                    {product.price} р.
                </span>
            </div>
            <div className={styles['product-item-description']}>
                {product.description}
            </div>
            <div className={styles['product-item-weight']}>
                {product.weight}
            </div>
            <img className={styles['product-item-image']} src={product.image} alt='' />
            <div className={styles['product-item-actions']}>
                {actions}
            </div>
        </ItemCard>
    );
}
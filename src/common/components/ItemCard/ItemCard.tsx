import React from 'react';
import classNames from 'classnames';

import styles from './ItemCard.module.scss';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export function ItemCard({
    className,
    children,
}: Props) {
    return (
        <div className={classNames(styles['item-card'], className)}>
            {children}
        </div>
    );
}
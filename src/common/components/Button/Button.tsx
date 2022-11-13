import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';
import { localization } from 'resources';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    filled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
};

export function Button({
    filled,
    isLoading,
    children,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={classNames(styles.button, {
                [styles['button__filled']]: filled && !isLoading,
                [styles['button__loading']]: isLoading,
            })}
            {...restProps}
        >
            {isLoading ? localization.loading : children}
        </button >
    );
}
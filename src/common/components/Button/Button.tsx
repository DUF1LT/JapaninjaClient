import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';
import { localization } from 'resources';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    filled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    tiny?: boolean;
};

export function Button({
    className,
    filled,
    isLoading,
    children,
    tiny,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={classNames(className, styles.button, {
                [styles['button__filled']]: filled && !isLoading,
                [styles['button__loading']]: isLoading,
                [styles['button__tiny']]: tiny,
            })}
            {...restProps}
        >
            {isLoading ? localization.loading : children}
        </button >
    );
}
import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    filled?: boolean;
    children: React.ReactNode;
};

export function Button({
    filled,
    children,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={classnames(styles.button, filled ? styles['button__filled'] : null)}
            {...restProps}
        >
            {children}
        </button >
    );
}
import classnames from 'classnames';

import styles from './Button.module.scss';


export type ButtonProps = {
    filled?: boolean;
    children: React.ReactNode;
};

export function Button({
    filled,
    children,
}: ButtonProps) {
    return (
        <button className={classnames(styles.button, filled ? styles['button__filled'] : null)} >
            {children}
        </button >
    );
}
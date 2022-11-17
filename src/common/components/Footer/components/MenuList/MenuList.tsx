import { Divider } from "@mui/material";

import styles from './MenuList.module.scss';

interface Props {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export function MenuList({
    title,
    className,
    children
}: Props) {
    return (
        <div className={className}>
            <span className={styles['menu-title']}>
                {title}
            </span>
            <Divider classes={{
                root: styles['divider']
            }}
            />
            <div className={styles['menu-body']}>
                {children}
            </div>
        </div>
    );
}
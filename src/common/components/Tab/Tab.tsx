import React from 'react';
import classNames from 'classnames';
import { Tab as MuiTab, TabProps } from "@mui/material";

import styles from './Tab.module.scss';


interface Props extends TabProps {
    className?: string;
    label: string;
    value: string | number;
    isFirst: boolean;
    isLast: boolean;
}

export function Tab({
    isFirst,
    isLast,
    className,
    label,
    value,
    ...restProps
}: Props) {
    console.log(value, isFirst, isLast);

    return (
        <MuiTab
            className={classNames(styles.tab, className, {
                [styles['first-tab']]: isFirst,
                [styles['last-tab']]: isLast,
            })}
            label={label}
            value={value}
            classes={{
                selected: styles['tab-selected'],
            }}
            {...restProps}
        />
    );
}
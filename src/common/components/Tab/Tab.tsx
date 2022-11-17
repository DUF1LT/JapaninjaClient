import React from 'react';
import classNames from 'classnames';
import { Tab as MuiTab, TabProps } from "@mui/material";

import styles from './Tab.module.scss';


interface Props extends TabProps {
    className?: string;
    label: string;
    value: string | number;
}

export function Tab({
    className,
    label,
    value,
    ...restProps
}: Props) {
    return (
        <MuiTab
            className={classNames(styles.tab, className)}
            label={label}
            value={value}
            classes={{
                selected: styles['tab-selected'],
            }}
            {...restProps}
        />
    );
}
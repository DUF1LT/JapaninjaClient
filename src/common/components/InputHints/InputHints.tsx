import React, { MutableRefObject, useEffect, useState } from 'react';
import { Paper, Popper, PopperPlacementType } from '@mui/material';
import classNames from 'classnames';

import styles from './InputHints.module.scss';


export type InputHintsProps = {
    inputRef: MutableRefObject<HTMLInputElement | null>;
    children: React.ReactNode;
    placement?: PopperPlacementType;
    forceClose?: boolean;
    className?: string;
    paperClassName?: string;
};

enum Event {
    Focus = 'focusin',
    Blur = 'focusout'
}

const defaultPaperElevation = 4;

export function InputHints({
    inputRef,
    children,
    placement = 'bottom',
    forceClose,
    className,
    paperClassName,
}: InputHintsProps) {
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        const inputElement = inputRef?.current;
        const handleFocus = () => setInputFocused(true);
        const handleBlur = () => setInputFocused(false);

        inputElement?.addEventListener(Event.Focus, handleFocus);
        inputElement?.addEventListener(Event.Blur, handleBlur);

        return (() => {
            inputElement?.removeEventListener(Event.Focus, handleFocus);
            inputElement?.removeEventListener(Event.Blur, handleBlur);
        });
    }, [inputRef]);

    const openFlag = forceClose ? false : inputFocused;

    return (
        <Popper
            open={openFlag}
            anchorEl={inputRef?.current}
            placement={placement}
            className={classNames(styles.popper, className)}
            style={{ width: inputRef.current?.clientWidth }}
        >
            <Paper
                elevation={defaultPaperElevation}
                className={classNames(styles['input-hint-paper'], paperClassName)}
            >
                {children}
            </Paper>
        </Popper>
    );
}

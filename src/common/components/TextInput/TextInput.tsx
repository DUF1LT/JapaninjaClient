import React, { ForwardedRef, InputHTMLAttributes } from 'react';

import classNames from 'classnames';
import { useField } from 'formik';

import styles from './TextInput.module.scss';
import './TextInput.module.scss';

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    name: string;
    ref?: ForwardedRef<HTMLInputElement | null>;
};

export const TextInput = React.forwardRef<HTMLInputElement | null, TextInputProps>(({
    className,
    ...props
}: TextInputProps, ref) => {
    const [field] = useField(props);

    return (
        <input
            {...field}
            {...props}
            ref={ref}
            className={classNames(styles['text-input'], className)}
        />
    );
});
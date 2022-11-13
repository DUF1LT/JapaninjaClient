import React, { InputHTMLAttributes } from 'react';

import styles from './TextInput.module.scss';
import './TextInput.module.scss';
import classNames from 'classnames';
import { useField } from 'formik';


type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    name: string;
};

export function TextInput({
    className,
    ...props
}: TextInputProps) {
    const [field] = useField(props);

    return (
        <input
            {...field}
            {...props}
            className={classNames(styles['text-input'], className)}
        />
    );
}
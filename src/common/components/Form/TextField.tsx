import React, { ForwardedRef } from "react";
import { ErrorMessage } from "formik";

import { TextInput } from "../TextInput";

import styles from './Form.module.scss';
import classNames from "classnames";


interface Props {
    className?: string;
    name: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    inputClassName?: string;
    ref: ForwardedRef<HTMLInputElement | null>;
}

export const TextField = React.forwardRef<HTMLInputElement | null, Props>(({
    className,
    name,
    placeholder,
    inputClassName,
    type = 'text',
}: Props, ref) => {
    return (
        <div className={classNames(className, styles['form-field'])}>
            <TextInput
                ref={ref}
                name={name}
                type={type}
                placeholder={placeholder}
                className={inputClassName}
            />
            <div className={styles['form-field-error']}>
                <ErrorMessage name={name} />
            </div>
        </div>
    );
});
import { ErrorMessage } from "formik";

import { TextInput } from "../TextInput";

import styles from './Form.module.scss';


interface Props {
    name: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    inputClassName?: string;
}

export function TextField({
    name,
    placeholder,
    inputClassName,
    type = 'text',
}: Props) {
    return (
        <div className={styles['form-field']}>
            <TextInput
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
} 
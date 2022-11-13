import { ErrorMessage } from "formik";

import { TextInput } from "../TextInput";

import styles from './Form.module.scss';


interface Props {
    name: string;
    placeholder?: string;
}

export function TextField({
    name,
    placeholder
}: Props) {
    return (
        <div className={styles['form-field']}>
            <TextInput
                name={name}
                placeholder={placeholder}
            />
            <div className={styles['form-field-error']}>
                <ErrorMessage name={name} />
            </div>
        </div>
    );
} 
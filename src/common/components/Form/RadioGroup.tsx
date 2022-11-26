import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup } from '@mui/material'
import { ErrorMessage, useField } from 'formik';

import { Colors } from 'assets/colors';

import styles from './Form.module.scss';

export type RadioOption = {
    label: string;
    option: string;
}

interface Props {
    name: string;
    label?: string;
    options: RadioOption[];
}

export function RadioGroup({
    name,
    label,
    options
}: Props) {
    const [field] = useField(name);

    const renderOption = (option: string) => (
        <Radio
            classes={{
                colorPrimary: Colors.Red,
                colorSecondary: Colors.White,
                root: styles['form-radio-group-option'],
            }}
            value={option}
            size='small'
        />
    );

    return (
        <div className={styles['form-field']}>
            <div>{label}</div>
            <MuiRadioGroup
                {...field}
                name={name}
                row
                className={styles['form-radio-group']}
            >
                {options.map(o => (
                    <FormControlLabel
                        label={o.label}
                        control={renderOption(o.option)}
                    />
                ))}
            </MuiRadioGroup>
            <div className={styles['form-field-error']}>
                <ErrorMessage name={name} />
            </div>
        </div >
    )
}
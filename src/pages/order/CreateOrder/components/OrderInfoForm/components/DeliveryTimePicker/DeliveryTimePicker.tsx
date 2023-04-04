import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";

import { OrderInfoFormPayload } from 'pages/order/CreateOrder/types';

import 'react-datepicker/dist/react-datepicker.css';
import './DeliveryTimePicker.scss';
import styles from './DeliveryTimePicker.module.scss';

interface Props {
    name: string;
}

export function DeliveryTimePicker({
    name
}: Props) {
    const now = new Date();
    const { values, setFieldValue } = useFormikContext<OrderInfoFormPayload>();
    const value = values.deliveryTime;

    return (
        <div className={styles.container}>
            <DatePicker
                selected={value}
                minDate={now}
                minTime={new Date(now)}
                maxTime={new Date(now.setHours(23, 59, 0, 0))}
                onChange={date => {
                    setFieldValue(name, date);
                }}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="HH:mm"
                timeFormat='HH:mm'
                autoComplete='off'
                timeIntervals={15}
                showPopperArrow={false}
                onKeyDown={e => {
                    e.preventDefault();
                }}
            />
            <div className={styles['error-message']}>
                <ErrorMessage name={name} />
            </div>
        </div>
    );
}
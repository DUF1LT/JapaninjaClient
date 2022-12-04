import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ErrorMessage, useFormikContext } from 'formik';

import { OrderInfoFormPayload } from 'pages/order/CreateOrder/types';

import styles from './DeliveryTimePicker.module.scss';
import dayjs from 'dayjs';

interface Props {
    name: string;
}

export function DeliveryTimePicker({
    name
}: Props) {
    const { values, setFieldValue } = useFormikContext<OrderInfoFormPayload>();
    const value = values.deliveryTime;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiTimePicker
                value={value}
                onChange={(newValue) => setFieldValue(name, newValue)}
                minTime={dayjs()}
                renderInput={(props) => (
                    <>
                        <TextField
                            name={name}
                            {...props}
                        />
                        <div className={styles['error-message']}>
                            <ErrorMessage name={name} />
                        </div>
                    </>
                )}
            />
        </LocalizationProvider>
    );
}
import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { OrderConfiguration } from "models/domain/OrderConfiguration";
import { localization } from "resources";
import { TextField } from "common/components/Form/TextField";

import { DeliveryTimeInfo } from "./components/DeliveryTimeInfo";
import { OrderInfoFormFields, OrderInfoFormPayload } from "../../types";
import { DeliveryInfo } from "./components/DeliveryInfo";

import styles from './OrderInfoForm.module.scss';
import { Button } from "common/components/Button";
import { useCreateOrderContext } from "../../context/CreateOrderContext";
import dayjs from "dayjs";



interface Props {
    orderConfiguration: OrderConfiguration;
    onSubmit: (payload: OrderInfoFormPayload) => void;
    isLoading?: boolean;
    error?: string | null;
}

export const OrderInfoForm = React.memo(({
    onSubmit,
    orderConfiguration,
    isLoading,
    error
}: Props) => {
    const { createOrderInfo } = useCreateOrderContext();

    const formInitialValues = useMemo(() => {
        const initialValues: OrderInfoFormPayload = {
            [OrderInfoFormFields.Name]: '',
            [OrderInfoFormFields.Phone]: '',
            [OrderInfoFormFields.Restaurant]: orderConfiguration.selfPickupRestaurant,
            [OrderInfoFormFields.DeliveryTime]: dayjs().add(2, 'hour'),
            [OrderInfoFormFields.AdditionalInfo]: '',
            [OrderInfoFormFields.Address]: '',
        };

        return initialValues;
    }, [orderConfiguration]);

    const validationSchema = useMemo(() => {
        const schema = {
            [OrderInfoFormFields.Name]: Yup.string().required(() => localization.enterPersonName),
            [OrderInfoFormFields.Phone]: Yup.string().required(() => localization.enterPhone),
            [OrderInfoFormFields.AdditionalInfo]: Yup.string(),
            [OrderInfoFormFields.Address]: Yup.string(),
            [OrderInfoFormFields.Restaurant]: Yup.object().shape({
                id: Yup.string(),
                address: Yup.string(),
            }),
            [OrderInfoFormFields.DeliveryTime]: Yup.object().nullable()
        };

        if (!createOrderInfo.isPickup) {
            schema.address = schema.address.required(() => localization.enterAddress);
        }

        if (!createOrderInfo.isASAPDelivery) {
            schema.deliveryTime = schema.deliveryTime.required(() => localization.enterTime);
        }

        return Yup.object(schema);
    }, [createOrderInfo]);

    const onFormSubmit = (payload: OrderInfoFormPayload) => {
        const cleanedPayload: OrderInfoFormPayload = {
            ...payload,
            deliveryTime: createOrderInfo.isASAPDelivery ? null : payload.deliveryTime,
            address: createOrderInfo.isPickup ? null : payload.address,
        };

        onSubmit(cleanedPayload);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={onFormSubmit}
        >
            <Form className={styles['order-info-form']}>
                <div className={styles['order-info-section']}>
                    <span className={styles['order-info-title']}>
                        {localization.deliveryInfo}
                    </span>
                    <DeliveryInfo
                        orderConfiguration={orderConfiguration}
                    />
                </div>
                <div className={styles['order-info-section']}>
                    <span className={styles['order-info-title']}>{localization.yourData}</span>
                    <div className={styles['order-info-your-data']}>
                        <TextField
                            className={styles['order-info-your-data-input']}
                            name={OrderInfoFormFields.Name}
                            placeholder={localization.personName}
                        />
                        <TextField
                            className={styles['order-info-your-data-input']}
                            name={OrderInfoFormFields.Phone}
                            placeholder={localization.phone}
                        />
                    </div>
                </div>
                <div className={styles['order-info-section']}>
                    <span className={styles['order-info-title']}>{localization.receivingTime}</span>
                    <DeliveryTimeInfo />
                </div>
                <div className={styles['order-info-section']}>
                    <span className={styles['order-info-title']}>{localization.additionalInformation}</span>
                    <div className={styles['order-info-your-data']}>
                        <TextField
                            className={styles['order-info-your-data-input']}
                            name={OrderInfoFormFields.AdditionalInfo}
                            placeholder={localization.leaveAnyUsefulOrderInformation}
                            type=''
                        />
                    </div>
                </div>
                <Button
                    filled
                    type='submit'
                    isLoading={isLoading}
                    className={styles['create-order-submit']}
                >
                    {localization.createOrder}
                </Button>
                {error !== null &&
                    (
                        <span className={styles['order-info-form-error']}>
                            {error}
                        </span>
                    )}
            </Form>
        </Formik>
    );
});
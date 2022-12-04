import { useRef } from "react";
import { useFormikContext } from "formik";

import { Button } from "common/components/Button";
import { OrderConfiguration } from "models/domain/OrderConfiguration";
import { localization } from "resources";
import { TextField } from "common/components/Form/TextField";
import { OrderInfoFormFields, OrderInfoFormPayload } from "pages/order/CreateOrder/types";
import { InputHints } from "common/components/InputHints";
import { useCreateOrderContext } from "pages/order/CreateOrder/context/CreateOrderContext";

import styles from './DeliveryInfo.module.scss';


interface Props {
    orderConfiguration: OrderConfiguration;
}

export function DeliveryInfo({
    orderConfiguration
}: Props) {
    const inputRef = useRef(null);
    const { values } = useFormikContext<OrderInfoFormPayload>();
    const { createOrderInfo, setCreateOrderInfo } = useCreateOrderContext();

    const addressValue = values[OrderInfoFormFields.Address];
    const addresses = orderConfiguration.addressess;

    const renderDeliveryInfoContent = () => {
        if (!createOrderInfo.isPickup) {
            return (
                <div className={styles['delivery-address']}>
                    <TextField
                        ref={inputRef}
                        name={OrderInfoFormFields.Address}
                        placeholder={localization.address}
                        type='text'
                    />
                    <InputHints
                        forceClose={addressValue !== '' || addresses.length === 0}
                        inputRef={inputRef}
                    >
                        {addresses.map(a => (
                            <span>{a.address}</span>
                        ))}
                    </InputHints>
                </div>
            );
        }

        return (
            <div className={styles['delivery-pickup']}>
                <span>{localization.pickupAddress}:</span>
                <span>{orderConfiguration.selfPickupRestaurant.address}</span>
            </div>
        )
    }

    return (
        <div className={styles['delivery-info']}>
            <div className={styles['delivery-info-options']}>
                <Button
                    className={styles['delivery-info-option']}
                    filled={!createOrderInfo.isPickup}
                    onClick={() => {
                        setCreateOrderInfo({ ...createOrderInfo, isPickup: false });
                    }}
                >
                    {localization.courierDelivery}
                </Button>
                <Button
                    className={styles['delivery-info-option']}
                    filled={createOrderInfo.isPickup}
                    onClick={() => {
                        setCreateOrderInfo({ ...createOrderInfo, isPickup: true });
                    }}
                >
                    {localization.pickup}
                </Button>
            </div>
            <div className={styles['delivery-info-content']}>
                {renderDeliveryInfoContent()}
            </div>
        </div>
    );
}
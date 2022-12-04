import { Button } from "common/components/Button";
import { useCreateOrderContext } from "pages/order/CreateOrder/context/CreateOrderContext";
import { OrderInfoFormFields } from "pages/order/CreateOrder/types";
import { localization } from "resources";

import { DeliveryTimePicker } from "../DeliveryTimePicker";

import styles from './DeliveryTimeInfo.module.scss';

export function DeliveryTimeInfo() {
    const { createOrderInfo, setCreateOrderInfo } = useCreateOrderContext();
    const isASAPDelivery = createOrderInfo.isASAPDelivery;

    return (
        <div className={styles['delivery-time-info']}>
            <div className={styles['delivery-time-info-options']}>
                <Button
                    className={styles['delivery-time-info-option']}
                    filled={isASAPDelivery}
                    onClick={() => setCreateOrderInfo({ ...createOrderInfo, isASAPDelivery: true })}
                >
                    {localization.asap}
                </Button>
                <Button
                    className={styles['delivery-time-info-option']}
                    filled={!isASAPDelivery}
                    onClick={() => setCreateOrderInfo({ ...createOrderInfo, isASAPDelivery: false })}
                >
                    {localization.toCertainTime}
                </Button>
            </div>
            {!isASAPDelivery && (<DeliveryTimePicker name={OrderInfoFormFields.DeliveryTime} />)}
        </div>
    );
}
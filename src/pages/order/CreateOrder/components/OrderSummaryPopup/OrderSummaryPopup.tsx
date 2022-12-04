import { Divider } from "@mui/material";
import { localization } from "resources";

import { useCreateOrderContext } from "../../context/CreateOrderContext";

import styles from './OrderSummaryPopup.module.scss';

interface Props {
    minDeliveryFreePrice: number,
    deliveryPrice: number;
    cartSum: number;
}

export function OrderSummaryPopup({
    cartSum,
    deliveryPrice,
    minDeliveryFreePrice,
}: Props) {
    const { createOrderInfo } = useCreateOrderContext();

    const computedDeliveryPrice = cartSum >= minDeliveryFreePrice
        ? 0
        : deliveryPrice;

    const totalPrice = createOrderInfo.isPickup ? cartSum : Number((cartSum + computedDeliveryPrice).toFixed(2));

    return (
        <div className={styles['order-summary']}>
            <span className={styles['order-summary-title']}>
                {localization.payment}
            </span>
            <div className={styles['order-payment-details']}>
                <div className={styles['order-sum']}>
                    <span>{localization.orderSum}</span>
                    <span>{cartSum} {localization.rubles}</span>
                </div>
                {!createOrderInfo.isPickup && (
                    <div className={styles['delivery-price']}>
                        <span>{localization.deliveryPrice}</span>
                        <span>{computedDeliveryPrice} {localization.rubles}</span>
                    </div>
                )}
            </div>
            <Divider className={styles['order-summary-divider']} />
            <div className={styles['order-total-price']}>
                <span>{localization.totalPrice}</span>
                <span>{totalPrice} {localization.rubles}</span>
            </div>
        </div>
    )
}
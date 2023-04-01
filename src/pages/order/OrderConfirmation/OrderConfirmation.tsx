import { Container } from "@mui/material";

import { Order } from "models/domain/Order";
import { useEffect } from "react";
import { localization } from "resources";
import { clearCart } from "store/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { buildCustomerAddressString } from "common/helpers/address/buildCustomerAddressString";

import styles from './OrderConfirmation.module.scss';

interface Props {
    order: Order;
}

export function OrderConfirmation({
    order,
}: Props) {
    const cart = useAppSelector(s => s.cart.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cart?.products?.length > 0) {
            dispatch(clearCart());
        }
    });

    const renderDeliveryInfo = () => {
        if (!order?.deliveryTime) {
            return (
                <>
                    <span className={styles['order-confirmation-title-text']}>
                        {localization.deliveryTime}
                    </span>
                    <span className={styles['order-confirmation-text']}>
                        {localization.asap}
                    </span>
                </>
            )
        }

        return (
            <>
                <span className={styles['order-confirmation-title-text']}>
                    {localization.deliveryTime}
                </span>
                <span className={styles['order-confirmation-text']}>
                    {order.deliveryTime.format("HH:mm")}
                </span>
            </>
        )
    }

    const renderAddress = () => {
        if (!order?.customerAddressId) {
            return (
                <>
                    <span className={styles['order-confirmation-title-text']}>
                        {localization.pickupAddress}
                    </span>
                    <span className={styles['order-confirmation-text']}>
                        {order.restaurant.address}
                    </span>
                </>
            )
        }

        return (
            <>
                <span className={styles['order-confirmation-title-text']}>
                    {localization.deliveryAddress}
                </span>
                <span className={styles['order-confirmation-text']}>
                    {buildCustomerAddressString(order?.customerAddress)}
                </span>
            </>
        )
    }

    return (
        <Container>
            <div className={styles['order-confirmation-page']}>
                <div className={styles['order-confirmation-title']}>
                    {localization.yourOrderIsAccepted}
                </div>
                <div className={styles['order-confirmation-content']}>
                    <img src='/OrderConfirmed.png' alt='' />
                    <div className={styles['order-confirmation-info']}>
                        <div className={styles['order-confirmation-item']}>
                            <span className={styles['order-confirmation-title-text']}>
                                {localization.yourOrderNumber}
                            </span>
                            <span className={styles['order-confirmation-text']}>
                                {order?.numberId}
                            </span>
                        </div>
                        <div className={styles['order-confirmation-item']}>
                            {renderDeliveryInfo()}
                        </div>
                        <div className={styles['order-confirmation-item']}>
                            {renderAddress()}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
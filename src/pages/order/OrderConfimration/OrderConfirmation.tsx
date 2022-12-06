import { Container } from "@mui/material";

import { Order } from "models/domain/Order";
import { localization } from "resources";

import styles from './OrderConfirmation.module.scss';

interface Props {
    order: Order;
}

export function OrderConfirmation({
    order,
}: Props) {
    const renderDeliveryInfo = () => {
        if (!order.deliveryTime) {
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
        if (!order.customerAddressId) {
            return (
                <>
                    <span className={styles['order-confirmation-title-text']}>
                        {localization.pickupAddress}
                    </span>
                    <span className={styles['order-confirmation-text']}>
                        {order.restraurant.address}
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
                    {order.customerAddress?.address}
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
                                {order.numberId}
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
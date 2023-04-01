import { buildCustomerAddressString } from "common/helpers/address/buildCustomerAddressString";
import { Order } from "models/domain/Order";
import { localization } from "resources";

import { ItemCard } from "../ItemCard";

import styles from './OrderItem.module.scss';

interface Props {
    order: Order;
    actions?: React.ReactElement;
    onMoreClick?: () => void;
}

export function OrderItem({
    order,
    actions,
    onMoreClick,
}: Props) {
    return (
        <ItemCard className={styles['order-item']}>
            <div className={styles['order-item-info']}>
                <div className={styles['order-item-header']}>
                    <span>#{order.numberId}</span>
                    <span className={styles['order-item-price']}>{order.price} {localization.rubles}</span>
                </div>
                <div className={styles['order-item-body']}>
                    <span>
                        <span className={styles['order-item-bold-text']}>{localization.client}: </span>
                        {order.customerName}, {order.customerPhoneNumber}
                    </span>
                    <span>
                        <span className={styles['order-item-bold-text']}>{localization.deliveryTime}: </span>
                        {order.deliveryTime === null ? localization.asap : order.deliveryTime.format("HH:mm")}
                    </span>
                    <span>
                        <span className={styles['order-item-bold-text']}>{localization.deliveryAddress}: </span>
                        {order.customerAddress === null ? localization.pickup : buildCustomerAddressString(order.customerAddress)}
                    </span>
                    <span
                        className={styles['order-item-more']}
                        onClick={onMoreClick}
                    >
                        {localization.more}
                    </span>
                </div>
            </div>
            <div className={styles['order-item-actions']}>
                {actions}
            </div>
        </ItemCard>
    );
}
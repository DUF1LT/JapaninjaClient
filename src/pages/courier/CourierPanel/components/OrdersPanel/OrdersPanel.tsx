import { useState } from "react";

import { OrderStatus } from "models/domain/OrderStatus";
import { LoadingStub } from "common/components/LoadingStub";
import { Button } from "common/components/Button";
import { localization } from "resources";
import { OrderItem } from "common/components/OrderItem";

import { useCourierOrdersPanel } from "./useCourierOrdersPanel";

import styles from './OrdersPanel.module.scss';
import { useCouriersOrders } from "common/helpers/order/useCouriersOrders";
import { Order } from "models/domain/Order";
import { OrderDetails } from "common/components/OrderDetails";


const orderStatusToLabel = new Map<OrderStatus, () => string>(
    [
        [OrderStatus.Ready, () => localization.ready],
        [OrderStatus.Shipping, () => localization.shipping],
        [OrderStatus.Closed, () => localization.closed],
    ]
);

const courierOrdersPanelTabs: OrderStatus[] = [
    OrderStatus.Ready,
    OrderStatus.Shipping,
    OrderStatus.Closed,
];

export function OrdersPanel() {
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.Ready);
    const { courierOrders, isLoading: isCourierOrdersLoading } = useCouriersOrders(status);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<Order>();

    const itemActionsDescriptor = useCourierOrdersPanel(status);

    const renderItemActions = (order: Order) => {
        const { cancel, mainAction } = typeof itemActionsDescriptor === 'function' ? itemActionsDescriptor(order) : itemActionsDescriptor;
        const areActionsLoading = cancel?.isLoading || mainAction?.isLoading;

        return (
            <div className={styles['order-item-actions']}>
                {!!cancel && (
                    <Button
                        onClick={() => cancel.onClick(order.id)}
                        isLoading={cancel.isLoading}
                        disabled={areActionsLoading}
                        tiny
                    >
                        {cancel.label()}
                    </Button>
                )}
                {!!mainAction && (
                    <Button
                        filled
                        onClick={() => mainAction.onClick(order.id)}
                        isLoading={mainAction.isLoading}
                        disabled={areActionsLoading}
                        tiny
                    >
                        {mainAction.label()}
                    </Button>
                )}
            </div>
        )
    }

    const renderOrders = () => {
        if (courierOrders.length === 0) {
            return (
                <div className={styles['orders-panel-stub']}>
                    {localization.thereAreNoOrders}
                </div>
            );
        }

        return (
            <div className={styles['orders-panel-body']}>
                {courierOrders.map(o => (
                    <OrderItem
                        order={o}
                        actions={renderItemActions(o)}
                        onMoreClick={() => {
                            setIsModalOpen(true);
                            setOrderDetails(o);
                        }}
                    />
                ))}
            </div>
        )
    };

    return (
        <div className={styles['orders-panel']}>
            <div className={styles['orders-panel-tabs']}>
                {courierOrdersPanelTabs.map(t => (
                    <Button
                        key={t}
                        className={styles['orders-panel-tab']}
                        value={t}
                        filled={status === t}
                        onClick={() => setStatus(t)}
                    >
                        {orderStatusToLabel.get(t)?.()}
                    </Button>
                ))}
            </div>
            {isCourierOrdersLoading
                ? (
                    <LoadingStub />
                )
                : (
                    renderOrders()
                )}
            <OrderDetails
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={orderDetails!}
            />
        </div>
    );
}
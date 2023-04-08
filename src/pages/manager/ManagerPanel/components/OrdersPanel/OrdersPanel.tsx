import { useState } from 'react';

import { localization } from 'resources';
import { Button } from 'common/components/Button';
import { getEnumMembers } from 'common/helpers/getEnumMembers';
import { OrderStatus } from 'models/domain/OrderStatus';
import { useOrders } from 'common/helpers/order/useOrders';
import { LoadingStub } from 'common/components/LoadingStub';
import { OrderItem } from 'common/components/OrderItem';
import { Order } from 'models/domain/Order';
import { OrderDetails } from 'common/components/OrderDetails';

import { useManagerOrdersPanel } from './useManagerOrdersPanel';

import styles from './OrdersPanel.module.scss';


const orderStatusToLabel: Record<OrderStatus, () => string> = {
    [OrderStatus.Processing]: () => localization.processing,
    [OrderStatus.Preparing]: () => localization.preparing,
    [OrderStatus.Ready]: () => localization.ready,
    [OrderStatus.Shipping]: () => localization.shipping,
    [OrderStatus.Closed]: () => localization.closed,
    [OrderStatus.Canceled]: () => localization.canceled,
};

const ordersPanelTabs = getEnumMembers(OrderStatus) as OrderStatus[];

export function OrdersPanel() {
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.Processing);
    const { orders, isLoading } = useOrders(status);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<Order>();

    const itemActionsDescriptor = useManagerOrdersPanel(status);

    const renderItemActions = (order: Order) => {
        const { cancel, mainAction } = typeof itemActionsDescriptor === 'function' ? itemActionsDescriptor(order) : itemActionsDescriptor;
        const areActionsLoading = cancel?.isLoading || mainAction?.isLoading;

        return (
            <div className={styles['order-item-actions']}>
                {!!cancel && (
                    <Button
                        onClick={() => cancel!.onClick(order.id)}
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
                        onClick={() => mainAction!.onClick(order.id)}
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
        if (orders.length === 0) {
            return (
                <div className={styles['orders-panel-stub']}>
                    {localization.thereAreNoOrders}
                </div>
            );
        }

        return (
            <div className={styles['orders-panel-body']}>
                {orders.map(o => (
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
                {ordersPanelTabs.map(t => (
                    <Button
                        key={t}
                        className={styles['orders-panel-tab']}
                        value={t}
                        filled={status === t}
                        onClick={() => setStatus(t)}
                    >
                        {orderStatusToLabel[t]()}
                    </Button>
                ))}
            </div>
            {isLoading
                ? (
                    <LoadingStub />
                )
                : (
                    renderOrders()
                )}
            {orderDetails && (
                <OrderDetails
                    orderId={orderDetails.id}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
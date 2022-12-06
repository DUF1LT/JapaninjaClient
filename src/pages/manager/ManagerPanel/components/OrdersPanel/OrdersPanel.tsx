import { useState } from 'react';

import { Button } from 'common/components/Button';
import { getEnumMembers } from 'common/helpers/getEnumMembers';
import { OrderStatus } from 'models/domain/OrderStatus';
import { localization } from 'resources';

import { useOrders } from 'common/helpers/order/useOrders';
import { LoadingStub } from 'common/components/LoadingStub';
import { OrderItem } from 'common/components/OrderItem';

import { useOrdersPanel } from './useOrdersPanel';

import styles from './OrdersPanel.module.scss';

const orderStatusToLabel: Record<OrderStatus, () => string> = {
    [OrderStatus.Processing]: () => localization.processing,
    [OrderStatus.Preparing]: () => localization.preparing,
    [OrderStatus.Ready]: () => localization.ready,
    [OrderStatus.Shipping]: () => localization.shipping,
    [OrderStatus.Closed]: () => localization.closed,
    [OrderStatus.Canceled]: () => localization.canceled,
};

const ordersPanelTabs = getEnumMembers(OrderStatus).filter(Number.isFinite) as OrderStatus[];

export function OrdersPanel() {
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.Processing);
    const { orders, isLoading } = useOrders(status);
    const itemActionsDescriptor = useOrdersPanel(status);

    const renderItemActions = (orderId: string) => {
        const { cancel, mainAction } = itemActionsDescriptor;

        return (
            <div className={styles['order-item-actions']}>
                {!!cancel && (
                    <Button
                        onClick={() => cancel.onClick(orderId)}
                        isLoading={cancel.isLoading}
                    >
                        {cancel.label()}
                    </Button>
                )}
                {!!mainAction && (
                    <Button
                        filled
                        onClick={() => mainAction.onClick(orderId)}
                        isLoading={mainAction.isLoading}
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
                        actions={renderItemActions(o.id)}
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
        </div>
    );
}
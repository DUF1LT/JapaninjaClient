import { useState } from "react";

import { Button } from "common/components/Button";
import { OrderItem } from "common/components/OrderItem";
import { localization } from "resources";
import { LoadingStub } from "common/components/LoadingStub";
import { useCustomerOrders } from "common/helpers/order/useCustomerOrders";
import { Order } from "models/domain/Order";
import { OrderDetails } from "common/components/OrderDetails";

import styles from './OrdersPanel.module.scss';



export function OrdersPanel() {
    const [isActiveOrders, setIsActiveOrders] = useState<boolean>(true);
    const { customerOrders, isLoading: isCourierOrdersLoading } = useCustomerOrders(isActiveOrders);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<Order>();

    const renderOrders = () => {
        if (customerOrders.length === 0) {
            return (
                <div className={styles['orders-panel-stub']}>
                    {localization.thereAreNoOrders}
                </div>
            );
        }

        return (
            <div className={styles['orders-panel-body']}>
                {customerOrders.map(o => (
                    <OrderItem
                        order={o}
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
                <Button
                    key={'true'}
                    className={styles['orders-panel-tab']}
                    filled={isActiveOrders}
                    onClick={() => setIsActiveOrders(true)}
                >
                    {localization.active}
                </Button>
                <Button
                    key={'false'}
                    className={styles['orders-panel-tab']}
                    filled={!isActiveOrders}
                    onClick={() => setIsActiveOrders(false)}
                >
                    {localization.completed}
                </Button>
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
import { useCloseOrder } from "common/helpers/order/useCloseOrder";
import { useShipOrder } from "common/helpers/order/useShipOrder";
import { OrderItemActionsDescriptor, OrderItemActionsDescriptorBuilder } from "common/types";
import { Order } from "models/domain/Order";
import { OrderStatus } from "models/domain/OrderStatus";
import { localization } from "resources";

const readyStatusActionsDecriptorBuilder = (
    onShip: (orderId: string) => void,
    isShippingLoading: boolean,
) => (order: Order): OrderItemActionsDescriptor => {
    if (order.customerAddress === null) {
        return {};
    }

    return {
        mainAction: {
            label: () => localization.ship,
            onClick: onShip,
            isLoading: isShippingLoading,
        }
    };
};

const shippingStatusActionsDecriptorBuilder = (
    onClose: (orderId: string) => void,
    isClosingLoading: boolean,
): OrderItemActionsDescriptor => ({
    mainAction: {
        label: () => localization.close,
        onClick: onClose,
        isLoading: isClosingLoading,
    }
});

export function useCourierOrdersPanel(orderStatus: OrderStatus): OrderItemActionsDescriptor | OrderItemActionsDescriptorBuilder {
    const { onShipOrder, isLoading: isShipOrderLoading } = useShipOrder();
    const { onCloseOrder, isLoading: isCloseOrderLoading } = useCloseOrder(orderStatus);

    let orderItemActionsDescriptor: OrderItemActionsDescriptor | OrderItemActionsDescriptorBuilder;
    switch (orderStatus) {
        case OrderStatus.Ready: {
            orderItemActionsDescriptor = readyStatusActionsDecriptorBuilder(
                onShipOrder,
                isShipOrderLoading,
            )
            break;
        }
        case OrderStatus.Shipping: {
            orderItemActionsDescriptor = shippingStatusActionsDecriptorBuilder(
                onCloseOrder,
                isCloseOrderLoading,
            )
            break;
        }
        default:
            return {}
    }

    return orderItemActionsDescriptor;
}
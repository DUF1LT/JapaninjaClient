import { useCancelOrder } from "common/helpers/order/useCancelOrder";
import { useCloseOrder } from "common/helpers/order/useCloseOrder";
import { useProcessOrder } from "common/helpers/order/useProcessOrder";
import { useSetToReadyOrder } from "common/helpers/order/useSetToReadyOrder";
import { ActionDecriptor, OrderItemActionsDescriptor, OrderItemActionsDescriptorBuilder } from "common/types";
import { Order } from "models/domain/Order";
import { OrderStatus } from "models/domain/OrderStatus";
import { localization } from "resources";

const cancelActionDecriptorBuilder = (
    onCancelClick: (orderId: string) => void,
    isCancelLoading: boolean,
): ActionDecriptor => ({
    label: () => localization.cancel,
    onClick: onCancelClick,
    isLoading: isCancelLoading,
});

const processingStatusActionsDecriptorBuilder = (
    onProcess: (orderId: string) => void,
    isProcessLoading: boolean,
    onCancel: (orderId: string) => void,
    isCancelLoading: boolean,
): OrderItemActionsDescriptor => ({
    cancel: cancelActionDecriptorBuilder(
        onCancel,
        isCancelLoading,
    ),
    mainAction: {
        label: () => localization.process,
        onClick: onProcess,
        isLoading: isProcessLoading,
    }
});

const prepairingStatusActionsDecriptorBuilder = (
    onSetToReady: (orderId: string) => void,
    isSetToReadyLoading: boolean,
): OrderItemActionsDescriptor => ({
    mainAction: {
        label: () => localization.setToReady,
        onClick: onSetToReady,
        isLoading: isSetToReadyLoading,
    }
});

const readyStatusActionsDecriptorBuilder = (
    onClose: (orderId: string) => void,
    isClosingLoading: boolean,
) => (order: Order): OrderItemActionsDescriptor => {
    if (order.customerAddress !== null) {
        return {};
    }

    return {
        mainAction: {
            label: () => localization.close,
            onClick: onClose,
            isLoading: isClosingLoading,
        }
    };
};

export function useManagerOrdersPanel(orderStatus: OrderStatus): OrderItemActionsDescriptor | OrderItemActionsDescriptorBuilder {
    const { onProcessOrder, isLoading: isProcessLoading } = useProcessOrder();
    const { onCancelOrder, isLoading: isCancelLoading } = useCancelOrder(orderStatus);
    const { onSetToReadyOrder, isLoading: isSetToReadyLoading } = useSetToReadyOrder();
    const { onCloseOrder, isLoading: isCloseOrderLoading } = useCloseOrder(orderStatus);

    let orderItemActionsDescriptor: OrderItemActionsDescriptor | OrderItemActionsDescriptorBuilder;
    switch (orderStatus) {
        case OrderStatus.Processing: {
            orderItemActionsDescriptor = processingStatusActionsDecriptorBuilder(
                onProcessOrder,
                isProcessLoading,
                onCancelOrder,
                isCancelLoading
            )
            break;
        }
        case OrderStatus.Preparing: {
            orderItemActionsDescriptor = prepairingStatusActionsDecriptorBuilder(
                onSetToReadyOrder,
                isSetToReadyLoading,
            )
            break;
        }
        case OrderStatus.Ready: {
            orderItemActionsDescriptor = readyStatusActionsDecriptorBuilder(
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
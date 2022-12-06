import { useCancelOrder } from "common/helpers/order/useCancelOrder";
import { useProcessOrder } from "common/helpers/order/useProcessOrder";
import { useSetToReadyOrder } from "common/helpers/order/useSetToReadyOrder";
import { OrderStatus } from "models/domain/OrderStatus";
import { localization } from "resources";

type ActionDecriptor = {
    label: () => string;
    onClick: (orderId: string) => void;
    isLoading: boolean;
}

type OrderItemActionsDescriptor = {
    cancel?: ActionDecriptor;
    mainAction?: ActionDecriptor;
};

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

export function useOrdersPanel(orderStatus: OrderStatus): OrderItemActionsDescriptor {
    const { onProcessOrder, isLoading: isProcessLoading } = useProcessOrder();
    const { onCancelOrder, isLoading: isCancelLoading } = useCancelOrder(orderStatus);
    const { onSetToReady, isLoading: isSetToReadyLoading } = useSetToReadyOrder();

    let orderItemActionsDescriptor: OrderItemActionsDescriptor;
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
                onSetToReady,
                isSetToReadyLoading,
            )
            break;
        }
        default:
            return {}
    }

    return orderItemActionsDescriptor;
}
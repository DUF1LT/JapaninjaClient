import { Order } from "models/domain/Order";

export type ActionDecriptor = {
    label: () => string;
    onClick: (orderId: string) => void;
    isLoading: boolean;
}

export type OrderItemActionsDescriptor = {
    cancel?: ActionDecriptor;
    mainAction?: ActionDecriptor;
};

export type OrderItemActionsDescriptorBuilder = (order: Order) => OrderItemActionsDescriptor;

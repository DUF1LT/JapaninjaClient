import { createContext, useContext } from "react";

export type CreateOrderInfo = {
    isPickup: boolean;
    isASAPDelivery: boolean;
}

export type CreateOrderContextData = {
    createOrderInfo: CreateOrderInfo,
    setCreateOrderInfo: (value: CreateOrderInfo) => void,
};

export const CreateOrderContext = createContext<CreateOrderContextData>({
    createOrderInfo: {
        isPickup: false,
        isASAPDelivery: true,
    },
    setCreateOrderInfo: () => { },
});

export const useCreateOrderContext = () => useContext(CreateOrderContext);

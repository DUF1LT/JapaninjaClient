import React, { PropsWithChildren, useState } from 'react';

import { CreateOrderContextData, CreateOrderContext, CreateOrderInfo } from './CreateOrderContext';


export function CreateOrderContextProvider({ children }: PropsWithChildren<unknown>) {
    const [createOrderInfo, setCreateOrderInfo] = useState<CreateOrderInfo>({
        isPickup: false,
        isASAPDelivery: true,
    });

    const contextData: CreateOrderContextData = {
        createOrderInfo,
        setCreateOrderInfo,
    };

    return (
        <CreateOrderContext.Provider value={contextData}>
            {children}
        </CreateOrderContext.Provider>
    );
}
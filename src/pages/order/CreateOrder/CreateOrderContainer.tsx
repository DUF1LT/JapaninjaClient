import { useEffect } from "react";

import { canCreateOrder } from "common/helpers/auth/authHelpers";
import { useOrderConfiguration } from "common/helpers/order/useOrderConfiguration";
import { RedirectUnauthorized } from "common/hoc";
import { useAppDispatch } from "store/hooks";

import { CreateOrder } from "./CreateOrder";
import { setAvailableCutlery } from "store/cartSlice";
import { createCartCutleryFrom } from "models/domain/helpers/createCartCutleryFrom";
import { LoadingStub } from "common/components/LoadingStub";

export function CreateOrderContainer() {
    const { orderConfiguration, isLoading } = useOrderConfiguration();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAvailableCutlery(orderConfiguration.cutlery.map(createCartCutleryFrom)))
        }
    }, [dispatch, orderConfiguration, isLoading])

    return (
        <RedirectUnauthorized
            checkIfAuthorized={canCreateOrder}
            checkOnlyAuthorizationRule
        >
            {isLoading
                ? <LoadingStub />
                : <CreateOrder orderConfiguration={orderConfiguration} />
            }
        </RedirectUnauthorized>
    );
}
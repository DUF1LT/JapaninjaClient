import { useParams } from "react-router-dom";

import { canAccessOrderConfirmation } from "common/helpers/auth/authHelpers";
import { useOrder } from "common/helpers/order/useOrder";
import { RedirectUnauthorized } from "common/hoc";

import { OrderConfirmation } from "./OrderConfirmation";

export function OrderConfirmationContainer() {
    const { id } = useParams();
    const { order, isLoading } = useOrder(id!);

    if (isLoading) {
        return null;
    }

    return (
        <RedirectUnauthorized
            checkIfAuthorized={() => canAccessOrderConfirmation(order)}
            checkOnlyAuthorizationRule
        >
            <OrderConfirmation order={order} />
        </RedirectUnauthorized>
    );
}
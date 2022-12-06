import { useParams } from "react-router-dom";

import { canAccessOrderConfirmation } from "common/helpers/auth/authHelpers";
import { useOrder } from "common/helpers/order/useOrder";
import { RedirectUnauthorized } from "common/hoc";

import { OrderConfirmation } from "./OrderConfirmation";
import { localization } from "resources";

export function OrderConfirmationContainer() {
    const { id } = useParams();

    const { order, isLoading } = useOrder(id!);

    if (isLoading) {
        return (
            <div>
                {localization.loading}
            </div>
        )
    }
    return (
        <RedirectUnauthorized
            checkIfAuthorized={() => true}
            checkOnlyAuthorizationRule
        >
            <OrderConfirmation order={order} />
        </RedirectUnauthorized>
    );
}
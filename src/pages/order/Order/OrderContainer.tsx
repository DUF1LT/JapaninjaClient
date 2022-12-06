import { useParams } from "react-router-dom";

import { canAccessOrder } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc";
import { useOrder } from "common/helpers/order/useOrder";
import { localization } from "resources";

import { OrderDetails } from "./OrderDetails";

export function OrderContainer() {
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
            checkIfAuthorized={(authData) => canAccessOrder(authData, order)}
        >
            <OrderDetails order={order} />
        </RedirectUnauthorized>
    )
}
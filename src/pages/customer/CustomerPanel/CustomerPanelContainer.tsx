import { isCustomer } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc";

import { CustomerPanel } from "./CustomerPanel";

export function CustomerPanelContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={isCustomer}
        >
            <CustomerPanel />
        </RedirectUnauthorized>
    )
}
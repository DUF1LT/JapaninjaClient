import { canDeliver } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc";

import { CourierPanel } from "./CourierPanel";

export function CourierPanelContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={canDeliver}
        >
            <CourierPanel />
        </RedirectUnauthorized>
    )
}
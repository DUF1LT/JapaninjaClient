import { canManage } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc";

import { ManagerMenu } from "./ManagerMenu";

export function ManagerMenuContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={canManage}
        >
            <ManagerMenu />
        </RedirectUnauthorized>
    );
}
import { canManage } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc"
import { ManagerPanel } from "./ManagerPanel";

export function ManagerPanelContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={canManage}
        >
            <ManagerPanel />
        </RedirectUnauthorized>
    );
}
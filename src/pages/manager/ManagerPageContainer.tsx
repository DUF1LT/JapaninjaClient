import { canManage } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc"
import { ManagerPage } from "./ManagerPage";

export function ManagerPageContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={canManage}
        >
            <ManagerPage />
        </RedirectUnauthorized>
    );
}
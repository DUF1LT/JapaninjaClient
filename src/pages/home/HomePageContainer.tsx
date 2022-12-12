import { canAccessHome } from "common/helpers/auth/authHelpers";
import { RedirectUnauthorized } from "common/hoc";
import { links } from "resources";
import { Home } from "./HomePage";

export function HomePageContainer() {
    return (
        <RedirectUnauthorized
            checkIfAuthorized={canAccessHome}
            checkOnlyAuthorizationRule
            redirectPath={links.courier.root}
        >
            <Home />
        </RedirectUnauthorized>
    )
}
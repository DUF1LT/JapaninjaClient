import { ProductType } from "models/domain/ProductType";
import { Role } from "models/response/AuthData";
import { links } from "resources";
import { useAppSelector } from "store/hooks";

export type RoleAppConfig = {
    haveCart: boolean;
    renderMenu: boolean;
    menuLinksBuilder?: (type: ProductType) => string;
}

const unauthorizedAppConfig: RoleAppConfig = {
    haveCart: true,
    renderMenu: true,
    menuLinksBuilder: links.menu.menuWithProductType,
};

const roleAppConfig = new Map<Role | undefined, RoleAppConfig>([
    [Role.Manager, {
        haveCart: false,
        renderMenu: true,
        menuLinksBuilder: links.manager.menuWithProductType
    }],
    [Role.Customer, {
        haveCart: true,
        renderMenu: true,
        menuLinksBuilder: links.menu.menuWithProductType,
    }],
    [Role.Courier, {
        haveCart: false,
        renderMenu: false,
    }],
]);

export function useRoleAppConfig(): RoleAppConfig {
    const auth = useAppSelector(state => state.auth);

    return roleAppConfig.get(auth.authData.role) || unauthorizedAppConfig;
}
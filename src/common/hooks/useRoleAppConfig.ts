import { ProductType } from "models/domain/ProductType";
import { Role } from "models/response/AuthData";
import { links } from "resources";
import { useAppSelector } from "store/hooks";

export type RoleAppConfig = {
    haveBusket: boolean;
    renderMenu: boolean;
    menuLinksBuilder?: (type: ProductType) => string;
}

const unauthorizedAppConfig: RoleAppConfig = {
    haveBusket: true,
    renderMenu: true,
    menuLinksBuilder: links.menu.menuWithProductType,
};

const roleAppConfig = new Map<Role | undefined, RoleAppConfig>([
    [Role.Manager, {
        haveBusket: false,
        renderMenu: true,
        menuLinksBuilder: links.manager.menuWithProductType
    }],
    [Role.Customer, {
        haveBusket: true,
        renderMenu: true,
        menuLinksBuilder: links.menu.menuWithProductType,
    }],
    [Role.Courier, {
        haveBusket: false,
        renderMenu: false,
    }],
]);

export function useRoleAppConfig(): RoleAppConfig {
    const auth = useAppSelector(state => state.auth);

    return roleAppConfig.get(auth.authData.role) || unauthorizedAppConfig;
}
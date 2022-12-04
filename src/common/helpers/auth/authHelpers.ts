import { AuthData, Role } from "models/response/AuthData";

export function canManage(authData: AuthData) {
    const role = authData.role;

    return role === Role.Manager;
}

export function canDeliver(authData: AuthData) {
    const role = authData.role;

    return role === Role.Courier;
}

export function canCreateOrder(authData: AuthData | Partial<AuthData>) {
    if (!hasAuthData(authData)) {
        return true;
    }

    const role = authData.role;

    return role === Role.Customer;
}

export function hasAuthData(authData: AuthData | Partial<AuthData>): authData is AuthData {
    if (!authData) {
        return false;
    }

    if (!authData.id || !authData.token || !authData.role || !authData.tokenExpirationTime) {
        return false;
    }

    return true;
}
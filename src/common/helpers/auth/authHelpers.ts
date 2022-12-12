import { Order } from "models/domain/Order";
import { OrderStatus } from "models/domain/OrderStatus";
import { AuthData, Role } from "models/response/AuthData";

export function canManage(authData: AuthData) {
    const role = authData.role;

    return role === Role.Manager;
}

export function canDeliver(authData: AuthData) {
    const role = authData.role;

    return role === Role.Courier;
}

export function isCustomer(authData: AuthData) {
    const role = authData.role;

    return role === Role.Customer;
}

export function canAccessHome(authData: AuthData) {
    if (!hasAuthData(authData)) {
        return true;
    }

    const role = authData.role;

    return role !== Role.Courier;
}

export function canCreateOrder(authData: AuthData | Partial<AuthData>) {
    if (!hasAuthData(authData)) {
        return true;
    }

    const role = authData.role;

    return role === Role.Customer;
}

export function canAccessOrder(authData: AuthData, order: Order) {
    const role = authData.role;

    if (role === Role.Customer && order.customerId === authData.id) {
        return true;
    }

    if (role === Role.Manager) {
        return true;
    }

    if (role === Role.Courier && (order.courierId === authData.id || order.status === OrderStatus.Ready)) {
        return true;
    }

    return false;
}

export function canAccessOrderConfirmation(order: Order) {
    if (order.status === OrderStatus.Processing) {
        return true;
    }

    return false;
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
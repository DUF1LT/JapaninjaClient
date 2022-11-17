export enum Role {
    Manager = 'manager',
    Customer = 'customer',
    Courier = 'courier',
}

export interface AuthData {
    id: string;
    token: string;
    tokenExpirationTime: string;
    role: Role;
}
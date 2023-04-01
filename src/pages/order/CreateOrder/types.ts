import { Dayjs } from "dayjs";
import { Restaurant } from "models/domain/Restaurant";

export enum CreateOrderFormFields {
    Products = 'products',
    Cutlery = 'cutlery',
}

export enum OrderInfoFormFields {
    Restaurant = 'restaurant',
    Address = 'address',
    DeliveryTime = 'deliveryTime',
    Name = 'name',
    Phone = 'phone',
    AdditionalInfo = 'additionalInfo',
}

export enum OrderInfoAddressFields {
    Street = "street",
    HouseNumber = "houseNumber",
    FlatNumber = "flatNumber",
    Entrance = "entrance",
    Floor = "floor",
}

export type CartOrderProduct = {
    productId: string;
    amount: number;
}

export type CartCutleryProduct = {
    cutleryId: string;
    amount: number;
}

export type OrderCustomerAddress = {
    addressId?: string,
    street: string,
    houseNumber: string,
    flatNumber?: string,
    entrance?: string,
    floor?: string,
}

export type CreateOrderFormPayload = {
    [CreateOrderFormFields.Products]: CartOrderProduct[];
    [CreateOrderFormFields.Cutlery]: CartCutleryProduct[];
    [OrderInfoFormFields.Restaurant]: Restaurant;
    [OrderInfoFormFields.Address]: OrderCustomerAddress | null;
    [OrderInfoFormFields.DeliveryTime]: Dayjs | null;
    [OrderInfoFormFields.Name]: string;
    [OrderInfoFormFields.Phone]: string;
    [OrderInfoFormFields.AdditionalInfo]: string;
};

export type OrderInfoFormPayload = Omit<CreateOrderFormPayload, CreateOrderFormFields.Cutlery | CreateOrderFormFields.Products>; 
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

export type OrderProduct = {
    productId: string;
    amount: number;
}

export type CutleryProduct = {
    cutleryId: string;
    amount: number;
}

export type CreateOrderFormPayload = {
    [CreateOrderFormFields.Products]: OrderProduct[];
    [CreateOrderFormFields.Cutlery]: CutleryProduct[];
    [OrderInfoFormFields.Restaurant]: Restaurant;
    [OrderInfoFormFields.Address]: string | null;
    [OrderInfoFormFields.DeliveryTime]: Dayjs | null;
    [OrderInfoFormFields.Name]: string;
    [OrderInfoFormFields.Phone]: string;
    [OrderInfoFormFields.AdditionalInfo]: string;
};

export type OrderInfoFormPayload = Omit<CreateOrderFormPayload, CreateOrderFormFields.Cutlery | CreateOrderFormFields.Products>; 
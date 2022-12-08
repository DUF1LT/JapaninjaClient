import dayjs, { Dayjs } from "dayjs";
import { CustomerAddress } from "./CustomerAddress";
import { OrdersCutlery } from "./OrdersCutlery";
import { OrdersProduct } from "./OrdersProduct";
import { OrderStatus } from "./OrderStatus";
import { Restaurant } from "./Restaurant";

export type OrderDescriptor = Omit<Order, 'deliveryTime' | 'deliveryFactTime'> & {
    deliveryTime: string | null;
    deliveryFactTime: string | null;
};

export class Order {
    id: string;
    numberId: number;
    customerId: string;
    customerName: string;
    price: number;
    customerPhoneNumber: string;
    courierId?: string | null;
    restaurantId: string;
    restaurant: Restaurant;
    customerAddressId: string;
    customerAddress: CustomerAddress;
    deliveryTime: Dayjs | null;
    deliveryFactTime: Dayjs | null;
    status: OrderStatus;
    comment?: string | null;
    products: OrdersProduct[];
    cutlery: OrdersCutlery[];

    constructor({
        id,
        numberId,
        customerId,
        customerName,
        price,
        customerPhoneNumber,
        courierId,
        restaurantId,
        restaurant,
        customerAddressId,
        customerAddress,
        deliveryTime,
        deliveryFactTime,
        status,
        comment,
        cutlery,
        products
    }: OrderDescriptor) {
        this.id = id;
        this.numberId = numberId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.price = price;
        this.customerPhoneNumber = customerPhoneNumber;
        this.courierId = courierId;
        this.restaurantId = restaurantId;
        this.restaurant = restaurant;
        this.customerAddressId = customerAddressId;
        this.customerAddress = customerAddress;
        this.deliveryTime = deliveryTime ? dayjs(deliveryTime) : null;
        this.deliveryFactTime = deliveryFactTime ? dayjs(deliveryFactTime) : null;
        this.status = status;
        this.comment = comment;
        this.cutlery = cutlery;
        this.products = products;
    }
}
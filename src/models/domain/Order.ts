import dayjs, { Dayjs } from "dayjs";
import { CustomerAddress } from "./CustomerAddress";
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
    restraurantId: string;
    restraurant: Restaurant;
    customerAddressId: string;
    customerAddress: CustomerAddress;
    deliveryTime: Dayjs | null;
    deliveryFactTime: Dayjs | null;
    orderStatus: OrderStatus;
    comment?: string | null;

    constructor({
        id,
        numberId,
        customerId,
        customerName,
        price,
        customerPhoneNumber,
        courierId,
        restraurantId,
        restraurant,
        customerAddressId,
        customerAddress,
        deliveryTime,
        deliveryFactTime,
        orderStatus,
        comment,
    }: OrderDescriptor) {
        this.id = id;
        this.numberId = numberId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.price = price;
        this.customerPhoneNumber = customerPhoneNumber;
        this.courierId = courierId;
        this.restraurantId = restraurantId;
        this.restraurant = restraurant;
        this.customerAddressId = customerAddressId;
        this.customerAddress = customerAddress;
        this.deliveryTime = deliveryTime ? dayjs(deliveryTime) : null;
        this.deliveryFactTime = deliveryFactTime ? dayjs(deliveryFactTime) : null;
        this.orderStatus = orderStatus;
        this.comment = comment;
    }
}
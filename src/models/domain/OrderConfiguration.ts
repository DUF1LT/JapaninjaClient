import { CustomerAddress } from "./CustomerAddress"
import { Cutlery } from "./Cutlery"
import { Restaurant } from "./Restaurant"

export type OrderConfiguration = {
    deliveryPrice: number,
    minDeliveryFreePrice: number,
    cutlery: Cutlery[],
    addressess: CustomerAddress[],
    selfPickupRestaurant: Restaurant,
}
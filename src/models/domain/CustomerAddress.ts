export type CustomerAddress = {
    id: string,
    customerId: string,
    street: string,
    houseNumber: string,
    flatNumber?: string,
    entrance?: string,
    floor?: string,
}
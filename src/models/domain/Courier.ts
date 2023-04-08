export type Courier = {
    id: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    image?: string,
}

export type CourierDetailed = Courier & {
    ordersAmount: number,
    averageRating: number,
}
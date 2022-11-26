import { ProductType } from "./ProductType";
import { SpicinessType } from "./SpicinessType";

export type Product = {
    id: string,
    name: string,
    description: string,
    weight: string,
    price: number,
    productType: ProductType,
    spiciness: SpicinessType,
    ingredients: string,
    image: string,
}
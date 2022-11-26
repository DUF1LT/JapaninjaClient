import { ProductType } from "models/domain/ProductType";
import { SpicinessType } from "models/domain/SpicinessType";

export enum ProductFormFields {
    Id = 'id',
    Name = 'name',
    Description = 'description',
    Weight = 'weight',
    Price = 'price',
    Type = 'productType',
    Spiciness = 'spiciness',
    Ingredients = 'ingredients',
    Image = 'image',
}

export type ProductFormPayload = {
    [ProductFormFields.Id]: string | null;
    [ProductFormFields.Name]: string;
    [ProductFormFields.Description]: string;
    [ProductFormFields.Weight]: string;
    [ProductFormFields.Price]: number;
    [ProductFormFields.Type]: ProductType;
    [ProductFormFields.Spiciness]: SpicinessType;
    [ProductFormFields.Ingredients]: string;
    [ProductFormFields.Image]: string;
} 
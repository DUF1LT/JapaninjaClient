import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { Product } from "models/domain/Product";

import { createError, getErrorByErrorType } from "./utils";
import { ProductType } from "models/domain/ProductType";


export class ProductsService {
    static async getProducts(type?: ProductType | null): Promise<Product[]> {
        try {
            var response = await $api.get<Product[]>(type ? endpoints.products.ofType(type) : endpoints.products.root);
            var products = response.data;

            return products;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }
}
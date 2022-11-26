import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { Product } from "models/domain/Product";

import { createError, getErrorByErrorType } from "./utils";
import { Error } from "./types";
import { ProductType } from "models/domain/ProductType";


export class ProductsService {
    static async getProducts(type?: ProductType | null): Promise<Product[] | Error> {
        try {
            var response = await $api.get<Product[]>(type ? endpoints.products.productsOfType(type) : endpoints.products.products);
            var products = response.data;

            return products;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                return getErrorByErrorType(errorData.error);
            }

            return createError(localization.somethingWentWrong);
        }
    }
}
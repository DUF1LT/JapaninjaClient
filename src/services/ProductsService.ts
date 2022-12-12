import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { Product } from "models/domain/Product";

import { createError, getErrorByErrorType } from "./utils";
import { ProductType } from "models/domain/ProductType";
import { SortBy } from "models/domain/SortBy";


export class ProductsService {
    static async getProducts(type?: ProductType | null, sortBy?: SortBy | null): Promise<Product[]> {
        try {
            const getEndpoint = () => {
                if (type && !sortBy) {
                    return endpoints.products.ofType(type);
                }

                if (type && sortBy) {
                    return endpoints.products.ofTypeWithSortBy(type, sortBy);
                }

                return endpoints.products.root;
            }

            var response = await $api.get<Product[]>(getEndpoint());
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
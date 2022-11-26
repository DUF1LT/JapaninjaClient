import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { ErrorResponse } from "models/response/ErrorResponse";

import { createError, getErrorByErrorType } from "./utils";
import { Error } from "./types";

export class ManagerService {
    static async createProduct(productPayload: ProductFormPayload): Promise<true | Error> {
        try {
            await $api.post(endpoints.products.products, productPayload);

            return true;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                return getErrorByErrorType(errorData.error);
            }

            return createError(localization.somethingWentWrong);
        }
    }

    static async editProduct(productPayload: ProductFormPayload): Promise<true | Error> {
        try {
            await $api.put(endpoints.products.productsWithId(productPayload.id!), productPayload);

            return true;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                return getErrorByErrorType(errorData.error);
            }

            return createError(localization.somethingWentWrong);
        }
    }

    static async deleteProduct(id: string): Promise<true | Error> {
        try {
            await $api.delete(endpoints.products.productsWithId(id));

            return true;
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
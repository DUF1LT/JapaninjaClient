import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ProductFormPayload } from "pages/manager/ManagerMenu/components/ProductForms/types";
import { ErrorResponse } from "models/response/ErrorResponse";

import { createError, getErrorByErrorType } from "./utils";

export class ManagerService {
    static async createProduct(productPayload: ProductFormPayload): Promise<void> {
        try {
            await $api.post(endpoints.products.root, productPayload);
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async editProduct(productPayload: ProductFormPayload): Promise<void> {
        try {
            await $api.put(endpoints.products.withId(productPayload.id!), productPayload);
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async deleteProduct(id: string): Promise<void> {
        try {
            await $api.delete(endpoints.products.withId(id));
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
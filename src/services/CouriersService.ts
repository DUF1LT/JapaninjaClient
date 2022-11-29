import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { Courier } from "models/domain/Courier";
import { RegisterCourierFormPayload } from "pages/manager/ManagerPanel/components/CouriersPanel/components/RegisterCourierForm/types";

import { createError, getErrorByErrorType } from "./utils";

export class CouriersService {
    static async registerCourier(payload: RegisterCourierFormPayload): Promise<void> {
        try {
            await $api.post(endpoints.couriers.root, payload);
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async fireCourier(id: string): Promise<void> {
        try {
            await $api.delete(endpoints.couriers.withId(id));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getCouriers(): Promise<Courier[]> {
        try {
            var result = await $api.get(endpoints.couriers.root);

            return result.data;
        } catch (error) {
            debugger;

            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }
}
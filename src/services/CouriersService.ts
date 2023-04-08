import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { Courier, CourierDetailed } from "models/domain/Courier";
import { RegisterCourierFormPayload } from "pages/manager/ManagerPanel/components/CouriersPanel/components/RegisterCourierForm/types";
import { EditCourierProfileFormPayload } from "pages/courier/CourierPanel/components/EditCourierProfileForm/types";

import { createError, getErrorByErrorType } from "./utils";

export type EditCourierPayload = {
    id: string;
    payload: EditCourierProfileFormPayload;
}

export class CouriersService {
    static async registerCourier(payload: RegisterCourierFormPayload): Promise<void> {
        try {
            await $api.post(endpoints.couriers.root, payload);
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.isAxiosError) {
                const errorData = axiosError.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async fireCourier(id: string): Promise<void> {
        try {
            await $api.delete(endpoints.couriers.withId(id));
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.isAxiosError) {
                const errorData = axiosError.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getCourier(courierId: string): Promise<CourierDetailed> {
        try {
            var result = await $api.get(endpoints.couriers.withId(courierId));

            return result.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.isAxiosError) {
                const errorData = axiosError.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async editCourier({ id, payload }: EditCourierPayload): Promise<void> {
        try {
            await $api.put(endpoints.couriers.withId(id), payload);
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.isAxiosError) {
                const errorData = axiosError.response?.data as ErrorResponse;

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
            const axiosError = error as AxiosError;

            if (axiosError.isAxiosError) {
                const errorData = axiosError.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }
}
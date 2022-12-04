import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { OrderConfiguration } from "models/domain/OrderConfiguration";

import { createError, getErrorByErrorType } from "./utils";
import { CreateOrderFormPayload, OrderInfoFormFields } from "pages/order/CreateOrder/types";

export type CreateOrderPayload = Omit<CreateOrderFormPayload, OrderInfoFormFields.DeliveryTime> & {
    customerId?: string;
    deliveryTime?: string | null;
}

export class OrdersService {
    static async getOrderConfiguration(customerId?: string): Promise<OrderConfiguration> {
        try {
            var response = await $api.get<OrderConfiguration>(endpoints.orders.orderConfiguration(customerId));
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

    static async createOrder(createOrderPayload: CreateOrderPayload): Promise<void> {
        try {
            await $api.post<void>(endpoints.orders.root, createOrderPayload);
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
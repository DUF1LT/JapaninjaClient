import { AxiosError } from "axios";

import { localization } from "resources";
import $api, { endpoints } from "api";

import { ErrorResponse } from "models/response/ErrorResponse";
import { OrderConfiguration } from "models/domain/OrderConfiguration";
import { Order, OrderDescriptor } from "models/domain/Order";
import { CreateOrderFormPayload, OrderInfoFormFields } from "pages/order/CreateOrder/types";

import { createError, getErrorByErrorType } from "./utils";
import { OrderStatus } from "models/domain/OrderStatus";

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

    static async createOrder(createOrderPayload: CreateOrderPayload): Promise<string> {
        try {
            var result = await $api.post<string>(endpoints.orders.root, createOrderPayload);

            var orderId = result.data;

            return orderId;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getOrder(orderId: string): Promise<Order> {
        try {
            var result = await $api.get<OrderDescriptor>(endpoints.orders.order(orderId));

            var orderDecriptor = result.data;

            return new Order(orderDecriptor);
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getOrders(orderStatus: OrderStatus): Promise<Order[]> {
        try {
            var result = await $api.get<OrderDescriptor[]>(endpoints.orders.orders(orderStatus));

            var orders = result.data;

            return orders.map(o => new Order(o));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getCouriersOrders(courierId: string, orderStatus: OrderStatus): Promise<Order[]> {
        try {
            var result = await $api.get<OrderDescriptor[]>(endpoints.orders.courierOrders(courierId, orderStatus));

            var orders = result.data;

            return orders.map(o => new Order(o));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async getCustomerOrders(customerId: string, isActiveOrder: boolean): Promise<Order[]> {
        try {
            var result = await $api.get<OrderDescriptor[]>(endpoints.orders.customerOrders(customerId, isActiveOrder));

            var orders = result.data;

            return orders.map(o => new Order(o));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async cancelOrder(orderId: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.cancel(orderId));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async processOrder(orderId: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.process(orderId));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async setToReadyOrder(orderId: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.setToReady(orderId));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async shipOrder(orderId: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.ship(orderId));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async closeOrder(orderId: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.close(orderId));
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData?.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async rateOrder(orderId: string, rating: number, feedback: string): Promise<void> {
        try {
            await $api.put<void>(endpoints.orders.rate(orderId), { rating, feedback });
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
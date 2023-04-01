import { AxiosError } from "axios";

import { localization } from "resources";

import { createError, getErrorByErrorType } from "./utils";

import { $api, endpoints } from "../api";
import { AuthData } from "../models/response/AuthData";
import { ErrorResponse } from "../models/response/ErrorResponse";

export class AuthService {
    static async login(email: string, password: string): Promise<AuthData> {
        try {
            const response = await $api.post<AuthData>(endpoints.auth.login, { email, password });

            return response.data as AuthData;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData.error);
            }

            throw createError(localization.somethingWentWrong);
        }
    }

    static async register(email: string, password: string, repeatPassword: string): Promise<AuthData> {
        try {
            const response = await $api.post<AuthData>(endpoints.auth.register, { email, password, repeatPassword });

            return response.data as AuthData;
        } catch (error) {
            const axiosErorr = error as AxiosError;
            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                throw getErrorByErrorType(errorData.error);
            }

            throw createError(localization.somethingWentWrong)
        };
    }
}
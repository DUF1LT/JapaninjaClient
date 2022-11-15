import { AxiosError } from "axios";

import { localization } from "resources";

import { $api, endpoints } from "../api";
import { AuthData } from "../models/response/AuthData";
import { ErrorResponse } from "../models/response/ErrorResponse";
import { createError, getErrorByErrorType } from "./utils";
import { Error } from "./types";

export class AuthService {
    static async login(email: string, password: string): Promise<AuthData | Error> {
        try {
            const response = await $api.post<AuthData>(endpoints.login, { email, password });

            return response.data as AuthData;
        } catch (error) {
            const axiosErorr = error as AxiosError;

            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                return getErrorByErrorType(errorData.error);
            }

            return createError(localization.somethingWentWrong);
        }
    }

    static async register(email: string, password: string, confirmPassword: string): Promise<AuthData | Error> {
        try {
            const response = await $api.post<AuthData>(endpoints.register, { email, password, confirmPassword });

            return response.data as AuthData;
        } catch (error) {
            const axiosErorr = error as AxiosError;
            if (axiosErorr.isAxiosError) {
                const errorData = axiosErorr.response?.data as ErrorResponse;

                return getErrorByErrorType(errorData.error);
            }

            return createError(localization.somethingWentWrong)
        };
    }
}
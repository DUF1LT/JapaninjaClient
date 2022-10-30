import { $api, endpoints } from "../api";
import { AuthData } from "../models/response/AuthResponse";
import { ErrorResponse } from "../models/response/ErrorResponse";

export class AuthService {
    static async login(email: string, password: string): Promise<AuthData | ErrorResponse> {
        try {
            const response = await $api.post<AuthData | ErrorResponse>(endpoints.login, { email, password });

            if (response.status !== 200) {
                return response.data as ErrorResponse;
            }

            return response.data as AuthData;
        } catch (error) {
            return { error: 'Something went wrong' };
        }
    }

    static async register(email: string, password: string, confirmPassword: string): Promise<AuthData | ErrorResponse> {
        try {
            const response = await $api.post<AuthData | ErrorResponse>(endpoints.register, { email, password, confirmPassword });

            if (response.status !== 200) {
                return response.data as ErrorResponse;
            }

            return response.data as AuthData;
        } catch (error) {
            console.log(error);

            return { error: 'Something went wrong' };
        }
    }
} 
import { useMutation } from "@tanstack/react-query";

import { LoginFormPayload } from "common/components/Header/components/Authorization/Forms/LoginForm";
import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";
import { Error } from "services/types";

import { loginQueries } from "./loginQueries";

type Result = {
    onLogin: (payload: LoginFormPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export const useLogin = (
    onSuccess: (authData: AuthData) => void
): Result => {
    const { mutate, isLoading, error } = useMutation<AuthData, Error, LoginFormPayload>(
        loginQueries.login,
        (loginData: LoginFormPayload) => AuthService.login(loginData.email, loginData.password),
        {
            onSuccess: onSuccess,
        },
    );

    return {
        onLogin: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
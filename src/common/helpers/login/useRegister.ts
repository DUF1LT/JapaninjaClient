import { useMutation } from "@tanstack/react-query";

import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";
import { RegisterFormPayload } from "common/components/Header/components/Authorization/Forms/RegistrationForm/types";
import { Error } from "services/types";

import { loginQueries } from "./loginQueries";

type Result = {
    onRegister: (payload: RegisterFormPayload) => void,
    isLoading: boolean,
    error: string | null,
};

export const useRegister = (
    onSuccess: (authData: AuthData) => void
): Result => {
    const { mutate, isLoading, error } = useMutation<AuthData, Error, RegisterFormPayload>(
        loginQueries.register,
        (registerData: RegisterFormPayload) => AuthService.register(registerData.email, registerData.password, registerData.repeatPassword),
        {
            onSuccess: onSuccess,
        },
    );

    return {
        onRegister: mutate,
        isLoading,
        error: error?.error ?? null,
    };
}
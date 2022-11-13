import { useCallback, useState } from "react";

import { LoginFormPayload } from "common/components/Header/components/LoginForm/types";
import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";

type Result = [
    onLogin: (payload: LoginFormPayload) => void,
    isLoading: boolean,
    error: string | null,
];

export const useLogin = (
    onSuccess: (authData: AuthData) => void
): Result => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onLogin = useCallback(async (payload: LoginFormPayload) => {
        setError('');
        setIsLoading(true);

        const { email, password } = payload;

        const loginResult = await AuthService.login(email, password);

        if ('error' in loginResult) {
            setError(loginResult.error)
            setIsLoading(false);
        } else {
            setIsLoading(false);
            onSuccess?.(loginResult);
        }
    }, [onSuccess]);

    return [onLogin, isLoading, error];
}
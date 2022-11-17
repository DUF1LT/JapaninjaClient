import { useCallback, useState } from "react";

import { LoginFormPayload } from "common/components/Header/components/Authorization/Forms/LoginForm";
import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";
import { localization } from "resources";

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

        try {
            const loginResult = await AuthService.login(email, password);

            if ('error' in loginResult) {
                setError(loginResult.error)
                setIsLoading(false);

                return;
            }

            setIsLoading(false);
            onSuccess?.(loginResult);
        }
        catch (e) {
            setIsLoading(false);
            setError(localization.somethingWentWrong)
        }
    }, [onSuccess]);

    return [onLogin, isLoading, error];
}
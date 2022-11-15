import { useCallback, useState } from "react";

import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";
import { RegisterFormPayload } from "common/components/Header/components/Authorization/Forms/RegistrationForm/types";

type Result = [
    onRegister: (payload: RegisterFormPayload) => void,
    isLoading: boolean,
    error: string | null,
];

export const useRegister = (
    onSuccess: (authData: AuthData) => void
): Result => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onRegister = useCallback(async (payload: RegisterFormPayload) => {
        setError('');
        setIsLoading(true);

        const { email, password, repeatPassword } = payload;

        const loginResult = await AuthService.register(email, password, repeatPassword);

        if ('error' in loginResult) {
            setIsLoading(false);
            setError(loginResult.error)

            return;
        }

        setIsLoading(false);
        onSuccess?.(loginResult);
    }, [onSuccess]);

    return [onRegister, isLoading, error];
}
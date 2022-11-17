import { useCallback, useState } from "react";

import { AuthService } from "services/AuthService";
import { AuthData } from "models/response/AuthData";
import { RegisterFormPayload } from "common/components/Header/components/Authorization/Forms/RegistrationForm/types";
import { localization } from "resources";

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


        try {
            const registerResult = await AuthService.register(email, password, repeatPassword);

            if ('error' in registerResult) {
                setIsLoading(false);
                setError(registerResult.error)

                return;
            }

            setIsLoading(false);
            onSuccess?.(registerResult);
        }
        catch (e) {
            setIsLoading(false);
            setError(localization.somethingWentWrong)
        }

    }, [onSuccess]);

    return [onRegister, isLoading, error];
}
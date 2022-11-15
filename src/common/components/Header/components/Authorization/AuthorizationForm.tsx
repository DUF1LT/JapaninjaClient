import React, { useCallback, useState } from 'react';

import { AuthData } from 'models/response/AuthData';

import { LoginForm } from './Forms/LoginForm';
import { RegistrationForm } from './Forms';

enum FormType {
    Login,
    Registration,
}

interface Props {
    isModalOpen: boolean;
    onSuccesfulAuthorize: (authData: AuthData) => void;
    onClose: () => void;
}

export function AuthorizationForm({
    isModalOpen,
    onSuccesfulAuthorize,
    onClose,
}: Props) {
    const [formType, setFormType] = useState<FormType>(FormType.Login);

    const onFormClose = useCallback(() => {
        setFormType(FormType.Login);
        onClose();
    }, [onClose]);

    if (formType === FormType.Login) {
        return (
            <LoginForm
                isOpen={isModalOpen}
                onRegisterLinkClick={() => setFormType(FormType.Registration)}
                onClose={onFormClose}
                onSuccesfulLogin={onSuccesfulAuthorize}
            />
        )
    }

    return (
        <RegistrationForm
            isOpen={isModalOpen}
            onLoginLinkClick={() => setFormType(FormType.Login)}
            onClose={onFormClose}
            onSuccesfulRegister={authData => {
                setFormType(FormType.Login);
                onSuccesfulAuthorize(authData);
            }}
        />
    )
}
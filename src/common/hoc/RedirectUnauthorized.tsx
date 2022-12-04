import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { AuthData } from "models/response/AuthData";
import { links } from "resources";
import { useAppSelector } from "store/hooks";
import { hasAuthData } from "common/helpers/auth/authHelpers";

interface Props {
    checkIfAuthorized: ((authData: AuthData) => boolean);
    children: JSX.Element;
    redirectPath?: string;
    checkOnlyAuthorizationRule?: boolean;
}

export function RedirectUnauthorized({
    checkIfAuthorized,
    children,
    redirectPath = links.root,
    checkOnlyAuthorizationRule = false,
}: Props) {
    const { authData, isLoggedIn } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const redirectUnauthorized = () => {
        if (checkOnlyAuthorizationRule && checkIfAuthorized(authData as AuthData)) {
            return;
        }

        if (!hasAuthData(authData)
            || !isLoggedIn
            || !checkIfAuthorized(authData)
        ) {
            return navigate(redirectPath);
        }
    }

    useEffect(() => {
        redirectUnauthorized()
    });


    return children;
}
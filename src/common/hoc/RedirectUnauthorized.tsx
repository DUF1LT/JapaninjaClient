import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { AuthData } from "models/response/AuthData";
import { links } from "resources";
import { useAppSelector } from "store/hooks";
import { hasAuthData } from "common/helpers/auth/authHelpers";

interface Props {
    checkIfAuthorized: (authData: AuthData) => boolean;
    children: JSX.Element;
    redirectPath?: string;
}

export function RedirectUnauthorized({
    checkIfAuthorized,
    children,
    redirectPath = links.root
}: Props) {
    const { authData, isLoggedIn: isLogedIn } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const redirectUnauthorized = () => {
        if (!hasAuthData(authData)
            || !isLogedIn
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
import React, { useState } from "react";

import { Button } from "common/components/Button";
import { login, logout } from "store/authSlice";
import { AuthData, Role } from "models/response/AuthData";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { links, localization } from "resources";

import { AuthorizationForm } from "./AuthorizationForm";

import styles from './Authorization.module.scss';
import { useNavigate } from "react-router-dom";
import { NavigationLink } from "common/components/NavigationLink";

const authDataRoleToString: Record<Role, string> = {
    [Role.Manager]: localization.manager,
    [Role.Customer]: localization.customer,
    [Role.Courier]: localization.courier,
}

const authDataRoleToStartPage: Record<Role, string> = {
    [Role.Manager]: links.manager.root,
    [Role.Customer]: links.root,
    [Role.Courier]: links.root,
}

const authDataRoleToAccountLink: Record<Role, string> = {
    [Role.Manager]: links.manager.root,
    [Role.Customer]: links.root,
    [Role.Courier]: links.root,
}

export function Authorization() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLoginClick = () => {
        setIsModalOpen(true);
    };

    const onSuccesfulAuthorize = (authData: AuthData) => {
        setIsModalOpen(false);
        dispatch(login(authData));
        navigate(authDataRoleToStartPage[authData.role]);
    };

    const onLogoutClick = () => {
        dispatch(logout());
        navigate(links.root);
    };

    return (
        <>
            <div className={styles.authorization}>
                {auth.isLoggedIn
                    ? (
                        <div className={styles['authorization-heading']}>
                            <NavigationLink
                                link={authDataRoleToAccountLink[auth.authData.role!]}
                                label={localization.hello(authDataRoleToString[auth.authData.role!])}
                            />
                            <Button onClick={onLogoutClick}>
                                {localization.exit}
                            </Button>
                        </div>
                    )
                    : (
                        <Button onClick={() => onLoginClick()}>
                            {localization.enter}
                        </Button>
                    )
                }
            </div>
            <AuthorizationForm
                isModalOpen={isModalOpen}
                onSuccesfulAuthorize={onSuccesfulAuthorize}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
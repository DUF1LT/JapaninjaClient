import { useState } from "react";

import { Button } from "common/components/Button";
import { login, logout } from "store/authSlice";
import { AuthData, Role } from "models/response/AuthData";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { localization } from "resources";

import styles from './Authorization.module.scss';
import { AuthorizationForm } from "./AuthorizationForm";

const authDataRoleToString: Record<Role, string> = {
    [Role.Manager]: localization.manager,
    [Role.Customer]: localization.customer,
    [Role.Courier]: localization.courier,
}

export function Authorization() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const onLoginClick = () => {
        setIsModalOpen(true);
    };

    const onSuccesfulAuthorize = (authData: AuthData) => {
        setIsModalOpen(false);
        dispatch(login(authData));
    };

    const onLogoutClick = () => {
        dispatch(logout());
    };

    return (
        <>
            <div className={styles.authorization}>
                {auth.isLogedIn
                    ? (
                        <div className={styles['authorization-heading']}>
                            <span>{localization.hello(authDataRoleToString[auth.authData.role!])}</span>
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
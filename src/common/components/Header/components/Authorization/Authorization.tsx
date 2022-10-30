import { Button } from "../../../Button";
import { AuthService } from "../../../../../services/AuthService";
import { login, logout } from "../../../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { localization } from "../../../../../resources";

import styles from './Authorization.module.scss';

export function Authorization() {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const onLoginClick = async () => {
        const loginResult = await AuthService.login('manager@japaninja.com', 'japaninja2022MANAGER');
        if ('error' in loginResult) {
            console.log('Error in login');
        } else {
            dispatch(login(loginResult));
        }
    };

    const onLogoutClick = async () => {
        dispatch(logout());
    };

    return (
        <div className={styles.authorization}>
            {auth.isLogedIn
                ? (
                    <div>
                        <span>{`Hello, ${auth.authData.role}`}</span>
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
    );
};
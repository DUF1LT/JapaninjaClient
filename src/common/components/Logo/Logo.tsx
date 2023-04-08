import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { canAccessHome } from "common/helpers/auth/authHelpers";

import { links } from "../../../resources";

import styles from './Logo.module.scss';
import { AuthData } from "models/response/AuthData";
import classNames from "classnames";



export function Logo() {
    const authData = useAppSelector(p => p.auth.authData);
    const canAccessHomePage = !authData ? false : canAccessHome(authData as AuthData);

    return (
        canAccessHomePage
            ? (
                <Link to={links.root} className={classNames(styles.logo)}>
                    JAPA<span className={styles['logo-red']}>NINJA</span>
                </Link>
            )
            : (
                <span className={classNames(styles.logo)}>
                    JAPA<span className={styles['logo-red']}>NINJA</span>
                </span>
            )
    );
}
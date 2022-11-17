import { Container, Divider } from "@mui/material";
import { canManage, hasAuthData } from "common/helpers/auth/authHelpers";
import { getAllProductTypes } from "models/domain/helpers/getAllProductTypes";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { useAppSelector } from "store/hooks";
import { Colors } from "../../../assets/colors";

import { links, localization } from "../../../resources";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { NavigationLink } from "../NavigationLink";
import { Authorization } from "./components/Authorization/Authorization";

import styles from './Header.module.scss';

export function Header() {
    const productTypes = getAllProductTypes();
    const { authData } = useAppSelector(state => state.auth);

    const menuLinkByRole = hasAuthData(authData) && canManage(authData)
        ? links.manager.menuWithProductType
        : links.menu.menuWithProductType;

    return (
        <Container
            className={styles.header}
            component='header'
        >
            <div className={styles['header-wrapper']}>
                <nav className={styles.navigation}>
                    <Authorization />
                </nav>
                <Divider color={Colors.LightBlack} className={styles.divider} />
                <div className={styles.tools}>
                    <div className={styles['tools-logo-and-search']}>
                        <Logo />
                    </div>
                    <div className={styles['tools-phone-and-basket']}>
                        <Button filled>
                            {localization.basket}
                        </Button>
                    </div>
                </div>
                <div className={styles['header-menu']}>
                    {productTypes.map(t => (
                        <NavigationLink
                            label={getStringByProductType(t)}
                            link={menuLinkByRole(t)}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}
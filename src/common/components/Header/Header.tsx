import { Container, Divider } from "@mui/material";

import { getAllProductTypes } from "models/domain/helpers/getAllProductTypes";
import { getStringByProductType } from "models/domain/helpers/getStringByProductType";
import { Colors } from 'assets/colors';
import { useRoleAppConfig } from "common/hooks/useRoleAppConfig";
import { useSelectedMenuType } from "common/hooks/useSelectedMenuType";

import { Authorization } from "./components/Authorization";
import { Localization } from "./components/Localization";

import { Logo } from "../Logo";
import { NavigationLink, NavigationLinkType } from "../NavigationLink";

import styles from './Header.module.scss';
import { Cart } from "./components/Cart";

export function Header() {
    const productTypes = getAllProductTypes();
    const { haveCart, renderMenu, menuLinksBuilder } = useRoleAppConfig();
    const selectedMenuType = useSelectedMenuType();

    return (
        <Container
            className={styles.header}
            component='header'
        >
            <div className={styles['header-wrapper']}>
                <nav className={styles.navigation}>
                    <Localization />
                    <Authorization />
                </nav>
                <Divider color={Colors.LightBlack} className={styles.divider} />
                <div className={styles.tools}>
                    <div className={styles['tools-logo-and-search']}>
                        <Logo />
                    </div>
                    {haveCart && (
                        <Cart />
                    )}
                </div>
                {renderMenu && (
                    <div className={styles['header-menu']}>
                        {productTypes.map(t => (
                            <NavigationLink
                                label={getStringByProductType(t)}
                                link={menuLinksBuilder!(t)}
                                type={t === selectedMenuType ? NavigationLinkType.Hightlighted : NavigationLinkType.Default}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}
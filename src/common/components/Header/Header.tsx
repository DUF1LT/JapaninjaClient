import { Container, Divider } from "@mui/material";
import { Colors } from "../../../assets/colors";

import { links, localization } from "../../../resources";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { NavigationLink } from '../NavigationLink';

import styles from './Header.module.scss';


export function Header() {
    return (
        <Container
            className={styles.header}
            component='header'
        >
            <div className={styles['header-wrapper']}>
                <nav className={styles.navigation}>
                    <div>
                        Минск
                    </div>
                    <div className={styles['navigation-links']}>
                        <NavigationLink link={links.root} label={localization.delivery} />
                        <NavigationLink link={links.root} label={localization.contacts} />
                        <NavigationLink link={links.aboutUs} label={localization.aboutUs} />
                    </div>
                    <div className={styles['navigation-login']}>
                        <Button>
                            {localization.enter}
                        </Button>
                    </div>
                </nav>
                <Divider color={Colors.LightBlack} className={styles.divider} />
                <Logo />
            </div>
        </Container>
    );
}
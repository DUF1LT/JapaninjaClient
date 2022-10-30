import { Container, Divider } from "@mui/material";
import { Colors } from "../../../assets/colors";

import { localization } from "../../../resources";
import { Button } from "../Button";
import { Logo } from "../Logo";
import { Authorization } from "./components/Authorization/Authorization";

import styles from './Header.module.scss';


export function Header() {
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
            </div>
        </Container>
    );
}
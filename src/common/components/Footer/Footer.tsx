import { Container } from '@mui/system';

import { Logo } from '../Logo';

import styles from './Footer.module.scss';


export function Footer() {
    return (
        <Container
            component='footer'
            className={styles.footer}
        >
            <div>
                <Logo />
            </div>
            <div className={styles["sections"]}>

            </div>
            <div className={styles["menu"]}>

            </div>
            <div className={styles["contacts"]}>

            </div>
            <div className={styles["social-networks"]}>

            </div>
        </Container>
    );
}
import { Link } from "react-router-dom";
import { links } from "../../../resources";

import styles from './Logo.module.scss';


export function Logo() {
    return (
        <Link to={links.root} className={styles.logo}>
            JAPA<span className={styles['logo-red']}>NINJA</span>
        </Link>
    );
}
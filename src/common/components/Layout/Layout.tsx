import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from './Layout.module.scss';


export function Layout() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

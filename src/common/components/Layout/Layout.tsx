import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from './Layout.module.scss';


export function Layout() {
    const a = useAppSelector(state => state.auth.authData.id);
    console.log(a);

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

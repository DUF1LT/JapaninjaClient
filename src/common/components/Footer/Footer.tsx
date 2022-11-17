import { Container } from '@mui/system';

import { canManage, hasAuthData } from 'common/helpers/auth/authHelpers';
import { getAllProductTypes } from 'models/domain/helpers/getAllProductTypes';
import { getStringByProductType } from 'models/domain/helpers/getStringByProductType';
import { links } from 'resources';
import { useAppSelector } from 'store/hooks';

import { Logo } from '../Logo';
import { NavigationLink } from '../NavigationLink';
import { MenuList } from './components/MenuList';

import styles from './Footer.module.scss';

export function Footer() {
    const productTypes = getAllProductTypes();
    const { authData } = useAppSelector(state => state.auth);

    const menuLinkByRole = hasAuthData(authData) && canManage(authData)
        ? links.manager.menuWithProductType
        : links.menu.menuWithProductType;

    return (
        <Container
            component='footer'
        >
            <div className={styles.footer}>
                <div>
                    <Logo />
                </div>
                <MenuList
                    title={'Меню'}
                    className={styles["menu"]}
                >
                    <div className={styles['menu-items']}>
                        {productTypes.map(t => (
                            <NavigationLink
                                label={getStringByProductType(t)}
                                link={menuLinkByRole(t)}
                                className={styles['menu-items-item']}
                            />
                        ))}
                    </div>
                </MenuList>
                <div className={styles["contacts"]}>

                </div>
                <div className={styles["social-networks"]}>

                </div>
            </div>
        </Container>
    );
}
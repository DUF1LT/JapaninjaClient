import { Container } from '@mui/material';

import { getAllProductTypes } from 'models/domain/helpers/getAllProductTypes';
import { getStringByProductType } from 'models/domain/helpers/getStringByProductType';
import { useRoleAppConfig } from 'common/hooks/useRoleAppConfig';

import { Logo } from '../Logo';
import { NavigationLink } from '../NavigationLink';
import { MenuList } from './components/MenuList';

import styles from './Footer.module.scss';

export function Footer() {
    const productTypes = getAllProductTypes();
    const { renderMenu, menuLinksBuilder } = useRoleAppConfig();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles['footer-body']}>
                    <Logo />
                    {renderMenu && (
                        <MenuList
                            title={'Меню'}
                            className={styles["menu"]}
                        >
                            <div className={styles['menu-items']}>
                                {productTypes.map(t => (
                                    <NavigationLink
                                        key={t}
                                        label={getStringByProductType(t)}
                                        link={menuLinksBuilder!(t)}
                                        className={styles['menu-item']}
                                    />
                                ))}
                            </div>
                        </MenuList>
                    )}
                    <div className={styles["contacts"]}>
                    </div>
                    <div className={styles["social-networks"]}>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
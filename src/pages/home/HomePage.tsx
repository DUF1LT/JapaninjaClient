import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { useRoleAppConfig } from "common/hooks/useRoleAppConfig";
import { links, localization } from "resources";
import { ProductType } from "models/domain/ProductType";

import styles from './HomePage.module.scss';

type ProductTypeCard = {
    label: () => string;
    productType: ProductType;
}

const productTypeCards: ProductTypeCard[] = [
    {
        label: () => localization.rolls,
        productType: ProductType.Rolls,
    },
    {
        label: () => localization.sushi,
        productType: ProductType.Sushi,
    },
    {
        label: () => localization.sets,
        productType: ProductType.Sets,
    },
    {
        label: () => localization.soups,
        productType: ProductType.Soups,
    },
    {
        label: () => localization.noodles,
        productType: ProductType.Noodles,
    },
    {
        label: () => localization.snacks,
        productType: ProductType.Snacks,
    },
    {
        label: () => localization.drinks,
        productType: ProductType.Drinks,
    },
    {
        label: () => localization.garnish,
        productType: ProductType.Garnish,
    },
];

export function Home() {
    const navigate = useNavigate();
    const { menuLinksBuilder } = useRoleAppConfig();

    return (
        <Container>
            <div className={styles['home-page']}>
                {productTypeCards.map(p => {
                    const linkTo = menuLinksBuilder?.(p.productType) ?? links.root;
                    return (
                        <div
                            className={classNames(styles['product-image'], styles[`product-image-${p.productType}`])}
                            onClick={() => navigate(linkTo)}
                        >
                            {p.label()}
                        </div>
                    )
                })}
            </div>
        </Container>
    );
}

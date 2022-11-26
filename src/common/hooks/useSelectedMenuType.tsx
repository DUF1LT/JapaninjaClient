import { ProductType } from "models/domain/ProductType";
import { useSearchParams, useLocation } from "react-router-dom";
import { links } from "resources";

const linksWithMenuType = [`/${links.menu.root}`, `/${links.manager.menu}`];

const productTypeParam = 'productType';

export function useSelectedMenuType(): ProductType | null {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const paramsMenuType = searchParams.get(productTypeParam);

    const selectedMenuType: ProductType | null = paramsMenuType ? paramsMenuType as ProductType : null;

    if (linksWithMenuType.includes(location.pathname) && !selectedMenuType) {
        setSearchParams({ [productTypeParam]: ProductType.Sushi })

        return ProductType.Sushi;
    }

    return selectedMenuType!;
}
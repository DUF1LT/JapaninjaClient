import { localization } from "resources";

import { ProductType } from "../ProductType";

const productTypeToString: Record<ProductType, string> = {
    [ProductType.Sushi]: localization.sushi,
    [ProductType.Rolls]: localization.rolls,
    [ProductType.Sets]: localization.sets,
    [ProductType.Soups]: localization.soups,
    [ProductType.Noodles]: localization.noodles,
    [ProductType.Snacks]: localization.snacks,
    [ProductType.Drinks]: localization.drinks,
    [ProductType.Garnish]: localization.garnish,
}

export const getStringByProductType = (type: ProductType) => productTypeToString[type];
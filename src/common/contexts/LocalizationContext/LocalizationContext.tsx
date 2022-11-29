import { createContext, useContext } from "react";

import { LocalizationEnum } from "resources/localization";

export type LocalizationContextData = {
    localization: LocalizationEnum,
    setLocalization: (value: LocalizationEnum) => void,
};

export const LocalizationContext = createContext<LocalizationContextData>({
    localization: LocalizationEnum.ruRu,
    setLocalization: () => { },
});

export const useLocalizationContext = () => useContext(LocalizationContext);

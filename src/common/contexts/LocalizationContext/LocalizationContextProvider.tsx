import React, { PropsWithChildren, useState } from 'react';
import { LocalizationEnum } from 'resources/localization';

import { LocalizationContextData, LocalizationContext } from './LocalizationContext';


export function LocalizationContextProvider({ children }: PropsWithChildren<unknown>) {
    const [localization, setLocalization] = useState<LocalizationEnum>(LocalizationEnum.ruRu);

    const contextData: LocalizationContextData = {
        localization,
        setLocalization,
    };

    return (
        <LocalizationContext.Provider value={contextData}>
            {children}
        </LocalizationContext.Provider>
    );
}
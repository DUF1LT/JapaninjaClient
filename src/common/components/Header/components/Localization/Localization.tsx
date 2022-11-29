import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { getEnumMembers } from "common/helpers/getEnumMembers";
import { localization, LocalizationEnum } from "resources/localization";
import { useLocalizationContext } from "common/contexts/LocalizationContext/LocalizationContext";

import { localizationStyles } from './styles';
import styles from './Localization.module.scss';

const localizations = getEnumMembers(LocalizationEnum);

const localizationEnumToString: Record<LocalizationEnum, string> = {
    [LocalizationEnum.ruRu]: localization.ru,
    [LocalizationEnum.enUs]: localization.en,
};

export function Localization() {
    const localizationContext = useLocalizationContext();

    return (
        <ToggleButtonGroup
            className={styles['localization']}
            value={localizationContext.localization}
            exclusive
            onChange={(e, value) => {
                localization.setLanguage(value);
                localizationContext.setLocalization(value);
            }}
            sx={localizationStyles}
        >
            {localizations.map(l => (
                <ToggleButton
                    className={styles['localization-button']}
                    value={l}
                >
                    {localizationEnumToString[l]}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
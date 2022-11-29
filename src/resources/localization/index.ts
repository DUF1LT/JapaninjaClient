import LocalizedStrings from 'react-localization';

import { ruRu } from './ruRu';
import { enUs } from './enUs';

export enum LocalizationEnum {
    ruRu = 'ruRu',
    enUs = 'enUs',
};

export const localization = new LocalizedStrings({
    [LocalizationEnum.ruRu]: ruRu,
    [LocalizationEnum.enUs]: enUs
});
import { localization } from "resources";

import { SpicinessType } from "../SpicinessType";

const spicinessTypeToString: Record<SpicinessType, string> = {
    [SpicinessType.NotSpicy]: localization.notSpicy,
    [SpicinessType.Spicy]: localization.spicy,
}

export const getStringBySpicinessType = (type: SpicinessType) => spicinessTypeToString[type];
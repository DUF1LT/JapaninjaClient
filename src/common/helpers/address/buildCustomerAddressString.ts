import { CustomerAddress } from "models/domain/CustomerAddress";
import { localization } from "resources";

export const buildCustomerAddressString = (customerAddress: CustomerAddress) => {
    let resultString: string[] = [
        localization.street(customerAddress.street),
        localization.houseNumber(customerAddress.houseNumber)
    ];

    if (customerAddress.flatNumber) {
        resultString.push(localization.flatNumber(customerAddress.flatNumber));
    }

    if (customerAddress.entrance) {
        resultString.push(localization.entrance(customerAddress.entrance));
    }

    if (customerAddress.floor) {
        resultString.push(localization.floor(customerAddress.floor));
    }

    return resultString.join(", ");
}
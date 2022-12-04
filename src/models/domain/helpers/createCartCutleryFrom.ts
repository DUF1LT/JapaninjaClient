import { CartCutlery } from "../CartCutlery";
import { Cutlery } from "../Cutlery";

export const createCartCutleryFrom = (cutlery: Cutlery): CartCutlery => ({
    cutlery: cutlery,
    amount: 0,
});
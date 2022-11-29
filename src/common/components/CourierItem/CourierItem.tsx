import { Courier } from "models/domain/Courier";
import { localization } from "resources";

import { Button } from "../Button";
import { ItemCard } from "../ItemCard";

import styles from './CourierItem.module.scss';


interface Props {
    courier: Courier;
    onFireButtonClick: () => void;
}

export function CourierItem({
    courier,
    onFireButtonClick,
}: Props) {
    return (
        <ItemCard className={styles['courier-item']} >
            <span className={styles['courier-item-name']}>
                {courier.fullName}
            </span>
            <span className={styles['courier-item-email']}>
                {courier.email}
            </span>
            <span className={styles['courier-item-phone']}>
                {courier.phoneNumber}
            </span>
            <Button
                filled
                onClick={onFireButtonClick}
            >
                {localization.fire}
            </Button>
        </ItemCard>
    );
}
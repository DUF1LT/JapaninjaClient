import { Dialog, DialogTitle, Divider } from "@mui/material";

import { Order } from "models/domain/Order";
import { localization } from "resources";

import { dialogStyles } from "../Form/styles";
import { DetailsProductItem } from "./components/DetailsProductItem";

import styles from './OrderDetails.module.scss';

interface Props {
    order: Order | null;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function OrderDetails({
    order,
    isOpen,
    onClose,
    className,
}: Props) {
    if (!order) {
        return null;
    }

    const renderComment = () => {
        if (order.comment === null || order.comment?.trim() === '') {
            return null
        }

        return (
            <span className={styles['order-details-modal-item']}>
                <span className={styles['order-details-modal-item-info']}>{localization.comment}: </span>
                {order.comment}
            </span>
        );
    }


    const renderCutlery = () => {
        const cutlery = order.cutlery;

        if (!cutlery || cutlery?.length === 0) {
            return null;
        }

        const cutleryString = cutlery.map(c => `${c.cutlery.name} x${c.amount}`).join(', ');

        return (
            <span className={styles['order-details-modal-item']}>
                <span className={styles['order-details-modal-item-info']}>{localization.cutlery}: </span>
                {cutleryString}
            </span>
        );
    }

    const renderDeliveryFactTime = () => {
        const deliveryFactTime = order.deliveryFactTime;

        if (!deliveryFactTime) {
            return null;
        }

        const label = order.customerAddressId !== null ? localization.deliveredTime : localization.completedTime;

        return (
            <span className={styles['order-details-modal-item']}>
                <span className={styles['order-details-modal-item-info']}>{label}: </span>
                {deliveryFactTime.format('HH:mm')}
            </span>
        );
    }

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['order-details-modal-paper'],
            }}
            maxWidth={'lg'}
        >
            <div className={styles['order-details-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.order} #{order.numberId}
                </DialogTitle>
                <div className={styles['order-details-modal-products']}>
                    {order.products.map(p => (
                        <DetailsProductItem
                            orderProduct={p}
                        />
                    ))}
                </div>
                <Divider className={styles['order-details-modal-divider']} />
                <div className={styles['order-details-modal-info']}>
                    {renderCutlery()}
                    {renderComment()}
                    {renderDeliveryFactTime()}
                </div>
            </div>
        </Dialog>
    )
}
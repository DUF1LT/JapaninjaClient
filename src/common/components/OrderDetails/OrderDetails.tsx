import { Dialog, DialogTitle, Divider } from "@mui/material";

import { localization } from "resources";
import { useAppSelector } from "store/hooks";
import { OrderStatus } from "models/domain/OrderStatus";
import { Role } from "models/response/AuthData";
import { useOrder } from "common/helpers/order/useOrder";

import { FeedbackSection } from "./components/FeedbackSection";
import { dialogStyles } from "../Form/styles";
import { DetailsProductItem } from "./components/DetailsProductItem";
import { LoadingStub } from "../LoadingStub";

import styles from './OrderDetails.module.scss';


interface Props {
    orderId: string;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

const orderStatusesWithCourier = [
    OrderStatus.Shipping,
    OrderStatus.Closed,
]

export function OrderDetails({
    orderId,
    isOpen,
    onClose,
    className,
}: Props) {
    const { authData } = useAppSelector(s => s.auth);
    const { order, isLoading } = useOrder(orderId);

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
        const cutlery = order.cutlery.filter(c => c.amount !== 0);

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
                {deliveryFactTime.format('DD.MM - HH:mm')}
            </span>
        );
    }

    const renderCourierInfo = () => {
        const isDeliveryOrder = !!order.restaurant;

        if (!orderStatusesWithCourier.includes(order.status) || !isDeliveryOrder || !order.courier) {
            return null;
        }

        const courier = order.courier;

        return (
            <div className={styles['order-details-modal-item']}>
                <span className={styles['order-details-modal-item-info']}>{localization.courier}: </span>
                <div className={styles['order-details-modal-item-courier-info']}>
                    {courier.image && (
                        <div className={styles['order-details-modal-item-image-wrapper']}>
                            <img className={styles['order-details-modal-item-image']} src={courier.image} alt='' />
                        </div>
                    )}
                    {courier.fullName}, {courier.phoneNumber}
                </div>
            </div>
        );
    }

    const renderFeedback = () => {
        if (order.status !== OrderStatus.Closed) {
            return null;
        }

        if (authData.role === Role.Customer) {
            return (
                <FeedbackSection
                    orderId={order.id}
                    isRated={order.isRated}
                    rating={order.rating}
                    feedback={order.feedback}
                />
            );
        }

        return FeedbackSection.Readonly({ rating: order.rating, feedback: order.feedback })
    }

    if (!order) {
        return null;
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
            {isLoading
                ? <LoadingStub />
                : (
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
                            {renderCourierInfo()}
                        </div>
                        <div className={styles['order-details-modal-feedback']}>
                            {renderFeedback()}
                        </div>
                    </div>
                )}
        </Dialog>
    )
}
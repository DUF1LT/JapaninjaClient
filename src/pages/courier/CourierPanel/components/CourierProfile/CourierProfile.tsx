import { useState } from 'react';

import { useCourier } from 'common/helpers/couriers/useCourier';
import { LoadingStub } from 'common/components/LoadingStub';
import { localization } from 'resources';
import { Rating } from 'common/components/Rating/Rating';

import { EditCourierProfileForm } from '../EditCourierProfileForm/EditCourierProfileForm';

import styles from './CourierProfile.module.scss';


const defaultUserImagePath = '/defaultUserImage.png';

export function CourierProfile() {
    const { courier, isLoading } = useCourier()
    const [isEditCourierProfileFormModalOpen, setEditCourierProfileFormModalOpen] = useState<boolean>(false);

    const renderProfileBody = () => {
        if (!courier) {
            return null;
        }

        return (
            <>
                <img className={styles['courier-profile-image']} src={courier?.image ?? defaultUserImagePath} alt='' />
                <div className={styles['courier-profile-info']}>
                    <div className={styles['courier-profile-info-group']}>
                        <span className={styles['courier-profile-info-entry']}>
                            {localization.personName}:&nbsp;<span className={styles['courier-profile-info-value']}>{courier.fullName}</span>
                        </span>
                        <span className={styles['courier-profile-info-entry']}>
                            {localization.phone}:&nbsp;<span className={styles['courier-profile-info-value']}>{courier.phoneNumber}</span>
                        </span>
                        <span className={styles['courier-profile-info-entry']}>
                            {localization.email}:&nbsp;<span className={styles['courier-profile-info-value']}>{courier.email}</span>
                        </span>
                    </div>
                    <div className={styles['courier-profile-info-group']}>
                        <span className={styles['courier-profile-info-entry']}>
                            {localization.ordersAmount}:&nbsp;<span className={styles['courier-profile-info-value']}>{courier.ordersAmount}</span>
                        </span>
                        <span className={styles['courier-profile-info-entry']}>
                            {localization.rating}:&nbsp;<Rating value={courier.averageRating} />
                        </span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {isLoading
                ? <LoadingStub />
                : (
                    <div className={styles['courier-profile']}>
                        <div className={styles['courier-profile-left']}>
                            {renderProfileBody()}
                        </div>
                        <span
                            className={styles['courier-profile-edit']}
                            onClick={() => setEditCourierProfileFormModalOpen(true)}
                        >
                            {localization.edit}
                        </span>
                    </div>
                )}

            {courier && (
                <EditCourierProfileForm
                    courierInfo={{
                        name: courier.fullName,
                        phone: courier.phoneNumber,
                        image: courier.image,
                    }}
                    isModalOpen={isEditCourierProfileFormModalOpen}
                    onClose={() => setEditCourierProfileFormModalOpen(false)}
                    onSuccessfulEdit={() => setEditCourierProfileFormModalOpen(false)}
                />
            )}
        </>
    );
}
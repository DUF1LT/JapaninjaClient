import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { localization } from 'resources';

import styles from './CouriersPanel.module.scss';
import { Button } from 'common/components/Button';
import { useCouriers } from 'common/helpers/couriers/useCouriers';
import { RegisterCourierForm } from './components/RegisterCourierForm';
import { ConfirmationDialog } from 'common/components/ConfirmationDialog';
import { CourierItem } from 'common/components/CourierItem';
import { Courier } from 'models/domain/Courier';
import { useFireCourier } from 'common/helpers/couriers/useFireCourier';


// const couriersPanelTabToLabel: Record<CouriersPanelTab, () => string> = {
//     [CouriersPanelTab.All]: () => localization.all,
//     [CouriersPanelTab.Delivering]: () => localization.delivering,
//     [CouriersPanelTab.Free]: () => localization.free,
// };

// const couriersPanelTabs = getEnumMembers(CouriersPanelTab).filter(Number.isFinite) as CouriersPanelTab[];

export function CouriersPanel() {
    // const [tab, setTab] = useState<CouriersPanelTab>(CouriersPanelTab.All);
    const [isRegisterCourierModalOpen, setIsRegisterCourierModalOpen] = useState<boolean>(false);
    const [isFireCourierModalOpen, setIsFireCourierModalOpen] = useState<boolean>(false);
    const [manageCourier, setManageCourier] = useState<Courier>();

    const { couriers, isLoading } = useCouriers();
    const { onFireCourier, isLoading: isFireLoading } = useFireCourier(() => setIsFireCourierModalOpen(false));

    const renderCouriers = () => {
        if (isLoading) {
            return (
                <div className={styles['couriers-panel-stub']}>
                    {localization.loading}
                </div>
            )
        }

        if (couriers?.length === 0) {
            return (
                <div className={styles['couriers-panel-stub']}>
                    {localization.thereAreNoCouriers}
                </div>
            )
        }

        return (
            <div className={styles['couriers-panel-content']}>
                {couriers.map(c => (
                    <CourierItem
                        courier={c}
                        onFireButtonClick={() => {
                            setIsFireCourierModalOpen(true);
                            setManageCourier(c);
                        }}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={styles['couriers-panel']}>
            {/* <div className={styles['couriers-panel-tabs']}>
                {couriersPanelTabs.map(t => (
                    <Button
                        key={t}
                        className={styles['couriers-panel-tab']}
                        value={t}
                        filled={tab === t}
                        onClick={() => setTab(t)}
                    >
                        {couriersPanelTabToLabel[t]}
                    </Button>
                ))}
            </div> */}
            <div className={styles['couriers-panel-body']} >
                <div className={styles['couriers-panel-header']}>
                    <Button
                        filled
                        onClick={() => setIsRegisterCourierModalOpen(true)}
                    >
                        <AddIcon />
                        {localization.add}
                    </Button>
                </div>
                {renderCouriers()}
            </div>
            <RegisterCourierForm
                isOpen={isRegisterCourierModalOpen}
                onClose={() => setIsRegisterCourierModalOpen(false)}
                onSuccesfulRegister={() => setIsRegisterCourierModalOpen(false)}
            />
            <ConfirmationDialog
                title={localization.areYouSureYouWantToDeleteCourier}
                isDialogOpen={isFireCourierModalOpen}
                onClose={() => setIsFireCourierModalOpen(false)}
                onNo={() => setIsFireCourierModalOpen(false)}
                onYes={() => onFireCourier(manageCourier?.id!)}
                isLoading={isFireLoading}
            />
        </div>
    );
}
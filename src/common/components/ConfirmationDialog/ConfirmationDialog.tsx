import { Dialog, DialogTitle } from "@mui/material";
import { useDelayedFlag } from "common/hooks/useDelayedFlag";
import { localization } from "resources";
import { Button } from "../Button";

import { dialogStyles } from "../Form/styles";

import styles from './ConfirmationDialog.module.scss';


interface Props {
    isDialogOpen: boolean;
    onClose: () => void;
    title: string
    onYes: () => void;
    onNo: () => void;
    isLoading?: boolean;
}

export function ConfirmationDialog({
    isDialogOpen,
    onClose,
    onNo,
    onYes,
    title,
    isLoading,
}: Props) {
    const isDelayedLoading = useDelayedFlag(300, [isLoading ?? false])

    return (
        <Dialog
            open={isDialogOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['confirmation-dialog-paper'],
            }}
        >
            <div className={styles['confirmation-dialog-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {title}
                </DialogTitle>
                <div className={styles['confirmation-dialog-buttons']}>
                    <Button
                        onClick={onNo}
                        disabled={isDelayedLoading}
                    >
                        {localization.no}
                    </Button>
                    <Button
                        onClick={onYes}
                        disabled={isDelayedLoading}
                        isLoading={isDelayedLoading}
                    >
                        {localization.yes}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}
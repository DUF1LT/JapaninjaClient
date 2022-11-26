import { Button, Dialog, DialogTitle } from "@mui/material";
import { localization } from "resources";

import { dialogStyles } from "../Form/styles";

import styles from './ConfirmationDialog.module.scss';


interface Props {
    isDialogOpen: boolean;
    onClose: () => void;
    title: string
    onYes: () => void;
    onNo: () => void;
}

export function ConfirmationDialog({
    isDialogOpen,
    onClose,
    onNo,
    onYes,
    title,
}: Props) {
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
                    <Button onClick={onNo}>{localization.no}</Button>
                    <Button onClick={onYes}>{localization.yes}</Button>
                </div>
            </div>
        </Dialog>
    )
}
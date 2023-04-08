import { Form, Formik } from "formik";
import { Dialog, DialogTitle } from "@mui/material";
import * as Yup from 'yup';

import { ImagePicker } from "common/components/Form/ImagePicker";
import { dialogStyles } from "common/components/Form/styles";
import { localization } from "resources";
import { Button } from "common/components/Button";
import { useEditCourier } from "common/helpers/couriers/useEditCourier";

import { EditCourierProfileFormFields } from "./types";

import styles from './EditCourierProfileForm.module.scss';
import { useMemo } from "react";
import { TextField } from "common/components/Form/TextField";

export type CourierEditInfo = {
    name: string;
    phone: string;
    image?: string;
}

interface Props {
    courierInfo: CourierEditInfo,
    isModalOpen: boolean;
    onClose?: () => void;
    onSuccessfulEdit: () => void;
}

const formConstraints = {
    nameMaxLength: 50,
}

const validationSchema = Yup.object().shape({
    [EditCourierProfileFormFields.Name]: Yup.string()
        .required(() => localization.enterPersonName)
        .max(formConstraints.nameMaxLength, () => localization.nameCanBeMaxLength(formConstraints.nameMaxLength)),
    [EditCourierProfileFormFields.Phone]: Yup.string().required(() => localization.enterPhone),
    [EditCourierProfileFormFields.Image]: Yup.string(),
});

export function EditCourierProfileForm({
    courierInfo,
    isModalOpen,
    onSuccessfulEdit,
    onClose,
}: Props) {
    const { onEditCourier, isLoading, error } = useEditCourier(onSuccessfulEdit);

    const formInitialValues = useMemo(() => ({
        [EditCourierProfileFormFields.Name]: courierInfo.name,
        [EditCourierProfileFormFields.Phone]: courierInfo.phone,
        [EditCourierProfileFormFields.Image]: courierInfo.image,
    }), [courierInfo]);

    return (
        <Dialog
            open={isModalOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['edit-courier-profile-form-modal-paper'],
            }}
        >
            <div className={styles['edit-courier-profile-form-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.editProfile}
                </DialogTitle>
                <Formik
                    initialValues={formInitialValues}
                    enableReinitialize
                    onSubmit={onEditCourier}
                    validationSchema={validationSchema}
                >
                    <Form className={styles['edit-courier-profile-form']}>
                        <div className={styles['edit-courier-profile-form-fields']}>
                            <TextField
                                className={styles['edit-courier-profile-form-fields-wide']}
                                name={EditCourierProfileFormFields.Name}
                                placeholder={localization.personName}
                            />

                            <TextField
                                className={styles['edit-courier-profile-form-fields-wide']}
                                name={EditCourierProfileFormFields.Phone}
                                placeholder={localization.phone}
                            />

                            <div className={styles['edit-courier-profile-form-fields-wide']}>
                                <ImagePicker
                                    name={EditCourierProfileFormFields.Image}
                                    className={styles['edit-courier-profile-form-image-picker']}
                                />
                            </div>
                        </div>
                        <Button
                            filled
                            isLoading={isLoading}
                            type='submit'
                        >
                            {localization.edit}
                        </Button>
                        {error !== null &&
                            (
                                <span className={styles['product-form-error']}>
                                    {error}
                                </span>
                            )}
                    </Form>
                </Formik>
            </div>
        </Dialog>
    );
}
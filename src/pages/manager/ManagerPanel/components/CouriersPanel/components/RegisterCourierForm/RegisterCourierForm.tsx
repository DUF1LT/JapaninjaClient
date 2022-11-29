import React from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { Dialog, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';

import { localization } from "resources";
import { dialogStyles } from 'common/components/Form/styles';
import { TextField } from 'common/components/Form/TextField';
import { Button } from 'common/components/Button';

import { RegisterCourierFormFields, RegisterCourierFormPayload } from "./types";

import styles from './RegisterCourierForm.module.scss';
import { useRegisterCourier } from 'common/helpers/couriers/useRegisterCourier';

YupPassword(Yup);

export type RegisterFormProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccesfulRegister?: () => void;
};

const initialValues: RegisterCourierFormPayload = {
    [RegisterCourierFormFields.Name]: '',
    [RegisterCourierFormFields.Phone]: '',
    [RegisterCourierFormFields.Email]: '',
    [RegisterCourierFormFields.Password]: '',
    [RegisterCourierFormFields.RepeatPassword]: '',
};

const formConstraints = {
    minLowerCase: 1,
    minUpperCase: 1,
    minNumber: 1,
    length: 6
}

const validationSchema = Yup.object({
    [RegisterCourierFormFields.Name]: Yup.string().required(() => localization.enterPersonName),
    [RegisterCourierFormFields.Phone]: Yup.string().required(() => localization.enterPhone),
    [RegisterCourierFormFields.Email]: Yup.string().email(() => localization.enterValidEmail).required(localization.enterEmail),
    [RegisterCourierFormFields.Email]: Yup.string().email(() => localization.enterValidEmail).required(localization.enterEmail),
    [RegisterCourierFormFields.Password]: Yup.string().required(() => localization.enterPassword)
        .min(formConstraints.length, () => localization.passwordsShouldHaveMinLength(formConstraints.length))
        .minLowercase(formConstraints.minLowerCase, localization.passwordsShouldHaveAtLeastLower(formConstraints.minLowerCase))
        .minUppercase(formConstraints.minUpperCase, localization.passwordsShouldHaveAtLeastUpper(formConstraints.minUpperCase))
        .minNumbers(formConstraints.minNumber, localization.passwordsShouldHaveAtLeastNumber(formConstraints.minNumber)),
    [RegisterCourierFormFields.RepeatPassword]: Yup.string()
        .required(() => localization.repeatPassword)
        .oneOf([Yup.ref(RegisterCourierFormFields.Password), null], () => localization.passwordsShouldMatch)
});

export function RegisterCourierForm({
    isOpen,
    onClose,
    onSuccesfulRegister,
    className
}: RegisterFormProps) {
    const { onRegisterCourier, isLoading, error } = useRegisterCourier(onSuccesfulRegister);

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['register-courier-form-modal-paper'],
            }}
        >
            <div className={styles['register-courier-form-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.courierRegistration}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onRegisterCourier}
                    validationSchema={validationSchema}
                >
                    <Form className={styles['register-courier-form']}>
                        <TextField
                            name={RegisterCourierFormFields.Name}
                            placeholder={localization.personName}
                        />

                        <TextField
                            name={RegisterCourierFormFields.Phone}
                            placeholder={localization.phone}
                        />

                        <TextField
                            name={RegisterCourierFormFields.Email}
                            placeholder={localization.email}
                        />

                        <TextField
                            name={RegisterCourierFormFields.Password}
                            type='password'
                            placeholder={localization.password}
                        />

                        <TextField
                            name={RegisterCourierFormFields.RepeatPassword}
                            type='password'
                            placeholder={localization.repeatPassword}
                        />

                        <Button
                            filled
                            isLoading={isLoading}
                            type='submit'
                        >
                            {localization.toRegister}
                        </Button>
                        {error !== null &&
                            (
                                <span className={styles['register-courier-form-error']}>
                                    {error}
                                </span>
                            )}
                    </Form>
                </Formik>
            </div>
        </Dialog>
    );
}
import React from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { Dialog, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';

import { AuthData } from "models/response/AuthData";
import { localization } from "resources";
import { dialogStyles } from 'common/components/Form/styles';
import { TextField } from 'common/components/Form/TextField';
import { Button } from 'common/components/Button';
import { useRegister } from 'common/helpers/login/useRegister';

import { RegisterFormFields, RegisterFormPayload } from "./types";

import styles from './RegistrationForm.module.scss';

YupPassword(Yup);

export type RegisterFormProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccesfulRegister: (authData: AuthData) => void;
    onLoginLinkClick: () => void;
};

const initialValues: RegisterFormPayload = {
    [RegisterFormFields.Email]: '',
    [RegisterFormFields.Password]: '',
    [RegisterFormFields.RepeatPassword]: '',
};

const formConstraints = {
    minLowerCase: 1,
    minUpperCase: 1,
    minNumber: 1,
    length: 6
}

const validationSchema = Yup.object({
    [RegisterFormFields.Email]: Yup.string().email(() => localization.enterValidEmail).required(() => localization.enterEmail),
    [RegisterFormFields.Password]: Yup.string().required(() => localization.pleaseRepeatPassword)
        .min(formConstraints.length, () => localization.passwordsShouldHaveMinLength(formConstraints.length))
        .minLowercase(formConstraints.minLowerCase, localization.passwordsShouldHaveAtLeastLower(formConstraints.minLowerCase))
        .minUppercase(formConstraints.minUpperCase, localization.passwordsShouldHaveAtLeastUpper(formConstraints.minUpperCase))
        .minNumbers(formConstraints.minNumber, localization.passwordsShouldHaveAtLeastNumber(formConstraints.minNumber)),
    [RegisterFormFields.RepeatPassword]: Yup.string()
        .required(() => localization.repeatPassword)
        .oneOf([Yup.ref(RegisterFormFields.Password), null], () => localization.passwordsShouldMatch)
});

export function RegistrationForm({
    isOpen,
    onClose,
    onSuccesfulRegister,
    onLoginLinkClick,
    className
}: RegisterFormProps) {
    const { onRegister, isLoading, error } = useRegister(onSuccesfulRegister);

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['registration-form-modal-paper'],
            }}
        >
            <div className={styles['registration-form-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.registration}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onRegister}
                    validationSchema={validationSchema}
                >
                    <Form className={styles['registration-form']}>
                        <TextField
                            name={RegisterFormFields.Email}
                            placeholder={localization.email}
                        />

                        <TextField
                            name={RegisterFormFields.Password}
                            type='password'
                            placeholder={localization.password}
                        />

                        <TextField
                            name={RegisterFormFields.RepeatPassword}
                            type='password'
                            placeholder={localization.repeatPassword}
                        />

                        <Button
                            filled
                            isLoading={isLoading}
                            type='submit'
                        >
                            {localization.register}
                        </Button>
                        {error !== null &&
                            (
                                <span className={styles['registration-form-error']}>
                                    {error}
                                </span>
                            )}
                    </Form>
                </Formik>
                <span
                    className={styles['registration-form-login']}
                    onClick={onLoginLinkClick}
                >
                    {localization.authorization}
                </span>
            </div>
        </Dialog>
    );
}
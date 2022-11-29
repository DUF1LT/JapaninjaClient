import React from 'react';
import { Dialog, DialogTitle } from "@mui/material";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { localization } from "resources/localization";
import { Button } from 'common/components/Button';
import { TextField } from 'common/components/Form/TextField';
import { useLogin } from 'common/helpers/login/useLogin';
import { AuthData } from 'models/response/AuthData';
import { dialogStyles } from 'common/components/Form/styles';

import { LoginFormFields, LoginFormPayload } from './types';

import styles from './LoginForm.module.scss';
import { useDelayedFlag } from 'common/hooks/useDelayedFlag';

export type LoginFormProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccesfulLogin: (authData: AuthData) => void;
    onRegisterLinkClick: () => void;
};

const initialValues: LoginFormPayload = {
    [LoginFormFields.Email]: '',
    [LoginFormFields.Password]: '',
};

const validationSchema = Yup.object({
    [LoginFormFields.Email]: Yup.string().email(localization.enterValidEmail).required(localization.enterEmail),
    [LoginFormFields.Password]: Yup.string().required(localization.enterPassword),
});

export function LoginForm({
    className,
    onClose,
    onSuccesfulLogin,
    onRegisterLinkClick,
    isOpen
}: LoginFormProps) {
    const { onLogin, isLoading, error } = useLogin(onSuccesfulLogin);
    const isDelayedLoading = useDelayedFlag(300, [isLoading ?? false])

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: dialogStyles
            }}
            classes={{
                paper: styles['login-form-modal-paper'],
            }}
        >
            <div className={styles['login-form-modal-content']}>
                <DialogTitle
                    fontFamily='inherit'
                    fontSize={24}
                >
                    {localization.authorization}
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onLogin}
                    validationSchema={validationSchema}
                >
                    <Form className={styles['login-form']}>
                        <TextField
                            name={LoginFormFields.Email}
                            placeholder={localization.email}
                        />

                        <TextField
                            name={LoginFormFields.Password}
                            type='password'
                            placeholder={localization.password}
                        />

                        <Button
                            filled
                            disabled={isDelayedLoading}
                            isLoading={isDelayedLoading}
                            type='submit'
                        >
                            {localization.enter}
                        </Button>
                        {error !== null &&
                            (
                                <span className={styles['login-form-error']}>
                                    {error}
                                </span>
                            )}
                    </Form>
                </Formik>
                <span
                    className={styles['login-form-register']}
                    onClick={onRegisterLinkClick}
                >
                    {localization.registration}
                </span>
            </div>
        </Dialog>
    )
}
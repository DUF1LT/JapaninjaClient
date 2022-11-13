import React from 'react';
import { Dialog, DialogTitle } from "@mui/material";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { localization } from "resources/localization";
import { Button } from 'common/components/Button';
import { TextField } from 'common/components/Form/TextField';
import { useLogin } from 'common/helpers/login/useLogin';
import { AuthData } from 'models/response/AuthData';

import { loginFormStyles } from './styles';
import { LoginFormFields, LoginFormPayload } from './types';

import styles from './LoginForm.module.scss';





export type LoginFormProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccesfulLogin: (authData: AuthData) => void;
};

const initialValues: LoginFormPayload = {
    [LoginFormFields.Email]: '',
    [LoginFormFields.Password]: '',
};

const validationSchema = Yup.object({
    [LoginFormFields.Email]: Yup.string().email(localization.pleaseEnterValidEmail).required(localization.pleaseEnterEmail),
    [LoginFormFields.Password]: Yup.string().required(localization.pleaseEnterPassword),
});

export function LoginForm({
    className,
    onClose,
    onSuccesfulLogin,
    isOpen
}: LoginFormProps) {
    const [onLogin, isLoading, error] = useLogin(onSuccesfulLogin);

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: loginFormStyles
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
                            placeholder={localization.password}
                        />

                        <Button
                            filled
                            isLoading={isLoading}
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
            </div>
        </Dialog>
    )
}
export enum RegisterFormFields {
    Email = 'email',
    Password = 'password',
    RepeatPassword = 'repeatPassword',
}

export type RegisterFormPayload = {
    [RegisterFormFields.Email]: string;
    [RegisterFormFields.Password]: string;
    [RegisterFormFields.RepeatPassword]: string;
} 
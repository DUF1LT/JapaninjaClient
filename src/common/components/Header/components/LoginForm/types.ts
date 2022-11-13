export enum LoginFormFields {
    Email = 'email',
    Password = 'password',
}

export type LoginFormPayload = {
    [LoginFormFields.Email]: string;
    [LoginFormFields.Password]: string;
} 
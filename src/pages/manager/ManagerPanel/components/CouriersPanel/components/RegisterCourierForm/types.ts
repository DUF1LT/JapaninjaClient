export enum RegisterCourierFormFields {
    Name = 'name',
    Email = 'email',
    Phone = 'phone',
    Password = 'password',
    RepeatPassword = 'repeatPassword',
}

export type RegisterCourierFormPayload = {
    [RegisterCourierFormFields.Name]: string;
    [RegisterCourierFormFields.Email]: string;
    [RegisterCourierFormFields.Phone]: string;
    [RegisterCourierFormFields.Password]: string;
    [RegisterCourierFormFields.RepeatPassword]: string;
} 
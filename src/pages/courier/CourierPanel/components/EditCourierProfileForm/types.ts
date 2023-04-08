export enum EditCourierProfileFormFields {
    Name = 'name',
    Phone = 'phone',
    Image = 'image',
}

export type EditCourierProfileFormPayload = {
    [EditCourierProfileFormFields.Name]: string;
    [EditCourierProfileFormFields.Phone]: string;
    [EditCourierProfileFormFields.Image]?: string;
}
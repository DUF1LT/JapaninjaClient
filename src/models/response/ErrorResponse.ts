export enum ErrorType {
    UserDoesNotExist = 'UserDoesNotExist',
    UserWithTheSameEmailAlreadyExist = 'UserWithTheSameEmailAlreadyExist',
    PasswordIsInvalid = 'PasswordIsInvalid',
}

export interface ErrorResponse {
    error: ErrorType;
}
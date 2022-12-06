export enum ErrorType {
    UserDoesNotExist = 'UserDoesNotExist',
    UserWithTheSameEmailAlreadyExist = 'UserWithTheSameEmailAlreadyExist',
    PasswordIsInvalid = 'PasswordIsInvalid',
    OrderShouldBeInProcessingStatus = 'OrderShouldBeInProcessingStatus',
}

export interface ErrorResponse {
    error: ErrorType;
}
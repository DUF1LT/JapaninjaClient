import { ErrorType } from "models/response/ErrorResponse";
import { localization } from "resources";
import { Error } from "./types";

export const createError = (error: string): Error => ({
    error,
});

const errorTypeToError: Record<ErrorType, Error> = {
    [ErrorType.UserDoesNotExist]: createError(localization.userDoesNotExist),
    [ErrorType.UserWithTheSameEmailAlreadyExist]: createError(localization.userAlreadyExists),
    [ErrorType.PasswordIsInvalid]: createError(localization.wrongPassword),
}

export const getErrorByErrorType = (errorType: ErrorType): Error => errorTypeToError[errorType] ?? createError(localization.somethingWentWrong);
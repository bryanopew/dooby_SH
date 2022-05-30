export const GET_ERRORS = "GET_ERRORS"
export const CLEAR_ERRORS = "CLEAR_ERRORS "

export type ErrorType = {
    errors?: ErrorAuthType,
    status?: number,
    id?: string
}

export type ErrorAuthType = {
    timestamp?: number;
    success?: boolean;
    statusCode?: number;
    data?: any;
    error?: ErrorInfoType;
    message?: string,
    type?: string,
    code?: number
  };

  export type ErrorInfoType = {
    errorCode?: number;
    errorMessage?: string;
  };

export interface ReturnErrors {
    type: typeof GET_ERRORS,
    payload: ErrorType
}

export interface ClearErrors {
    type: typeof CLEAR_ERRORS
}

export type ErrorDispatchTypes = ReturnErrors | ClearErrors
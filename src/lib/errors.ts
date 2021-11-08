export enum StatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
}

export const ERROR_SEPERATOR_TOKEN = '___';

export class UiError extends Error {
  code: number;
  constructor(errorBody: any = 'An error occured') {
    if (typeof errorBody === 'string') {
      errorBody = {
        message: errorBody,
      };
    }

    if (Array.isArray(errorBody.message)) {
      errorBody.message = errorBody.message.join(ERROR_SEPERATOR_TOKEN);
    }

    super(errorBody.message);
    this.code = errorBody.statusCode;
  }
}

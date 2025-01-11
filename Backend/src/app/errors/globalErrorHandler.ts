/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import errorPreproccesor from './errorPreprocessor';
import { TErrorResponse } from './errorResponse';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorResponse: TErrorResponse = {
    success: false,
    message: err.message || 'Something went wrong',
    issues: err.issues || [],
  };

  errorResponse = errorPreproccesor(err);
  if (errorResponse.issues) {
    res.status(400).json({
      success: false,
      message: errorResponse.message,
      errorMessage:
        errorResponse?.issues[0].message === 'Required'
          ? `${errorResponse.issues[0].path} is required`
          : errorResponse?.issues[0].message,
      errorDetails: { issues: errorResponse.issues },
      stack: err.stack,
    });
  } else {
    res.status(400).json({
      success: false,
      message: errorResponse.message,
      errorMessage: errorResponse.errorMessage,
      errorDetails: { issues: errorResponse.issues },
      stack: err.stack,
    });
  }
};

export default globalErrorHandler;

/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { TErrorIssue, TErrorResponse } from './errorResponse';
import DuplicateError from './duplicateError';
import ValidationError from './validationError';
import CastError from './castError';
import GenericError from './genericError';
import handleZodError from './zodError';
import AuthError from './authError';

const errorPreproccesor = (err: any): TErrorResponse => {
  if (err instanceof ZodError) {
    return handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    return ValidationError(err);
  } else if (err.code && err.code === 11000) {
    return DuplicateError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    return CastError(err);
  } else if (err instanceof GenericError) {
    const issues: TErrorIssue[] = [
      {
        path: '',
        message: err.message,
      },
    ];

    return {
      success: false,
      message: 'Generic Error',
      issues,
    };
  } else if (err instanceof AuthError) {
    return {
      success: false,
      message: 'Unauthorized Access',
      errorMessage: err.message,
      errorDetails: null,
      stack: null,
    };
  } else {
    return {
      success: false,
      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: err.message,
        },
      ],
    };
  }
};

export default errorPreproccesor;

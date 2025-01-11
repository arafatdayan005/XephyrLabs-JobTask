import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './errorResponse';

const CastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    success: false,
    message: 'Cast Error',
    issues,
  };
};

export default CastError;

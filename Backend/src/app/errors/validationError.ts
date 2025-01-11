import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './errorResponse';

const ValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorValues = Object.values(err.errors);
  const issues: TErrorIssue[] = [];
  errorValues.forEach((errObj) => {
    issues.push({
      path: errObj.path,
      message: errObj.message,
    });
  });

  return {
    success: false,
    message: 'Validation Error',
    issues,
  };
};

export default ValidationError;

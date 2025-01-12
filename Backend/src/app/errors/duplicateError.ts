import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './errorResponse';

const DuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const regex = /"(.*?)"/;
  const matches = err.message.match(regex);
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: `${matches![1]} is already registered`,
    },
  ];

  return {
    success: false,
    message: 'Duplicate Error',
    issues,
  };
};

export default DuplicateError;

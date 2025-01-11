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
      message: `Duplicate value for ${matches![1]}`,
    },
  ];

  return {
    success: false,
    message: 'Duplicate Error',
    issues,
  };
};

export default DuplicateError;

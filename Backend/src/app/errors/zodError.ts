import { ZodError } from 'zod';
import { TErrorIssue, TErrorResponse } from './errorResponse';

const handleZodError = (err: ZodError): TErrorResponse => {
  const issues: TErrorIssue[] = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    success: false,
    message: 'Validation Error',
    issues,
  };
};

export default handleZodError;

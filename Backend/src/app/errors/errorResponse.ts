export type TErrorResponse = {
  success: boolean;
  message: string;
  errorMessage?: string;
  errorDetails?: null;
  stack?: string | null;
  issues?: TErrorIssue[];
};

export type TErrorIssue = {
  path: string | number;
  message: string;
};

import { Response } from 'express';

type TSuccessResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: object;
  data: T | T[] | null;
};

const successResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    meta: data?.meta,
    data: data.data,
  });
};

export default successResponse;

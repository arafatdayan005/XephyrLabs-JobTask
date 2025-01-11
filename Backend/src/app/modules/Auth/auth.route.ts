import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { authControllers } from './auth.controller';
import { loginValidationSchema } from './auth.validation';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);

export const AuthRoutes = router;

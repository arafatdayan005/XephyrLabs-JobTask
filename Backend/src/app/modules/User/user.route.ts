import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { userValidationSchema } from './user.validation';
import { userControllers } from './user.controller';

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
  '/register',
  validateRequest(userValidationSchema),
  userControllers.registerUser,
);

export const UserRoutes = router;

import express, { NextFunction, Request, Response } from 'express';
import { productControllers } from './product.controller';
import { AnyZodObject } from 'zod';
import {
  productValidationSchema,
  updateProductValidationSchema,
} from './product.validation';

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
  '/',
  validateRequest(productValidationSchema),
  productControllers.createProduct,
);
router.get('/', productControllers.getAllProduct);
router.put(
  '/:productId',
  validateRequest(updateProductValidationSchema),
  productControllers.updateProduct,
);
router.delete('/delete', productControllers.deleteManyProduct);
router.delete('/:productId', productControllers.deleteProduct);


export const ProductRoutes = router;

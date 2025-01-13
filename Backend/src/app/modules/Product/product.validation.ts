import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
  image: z.string().min(1),
  type: z.enum(["home", "garden", "sports", "gadget"]),
  email: z.string().min(1),
});

export const updateProductValidationSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  quantity: z.number().nonnegative().optional(),
  image: z.string().min(1).optional(),
  type: z.enum(["home", "garden", "sports", "gadget"]).optional(),
  email: z.string().min(1).optional(),
});

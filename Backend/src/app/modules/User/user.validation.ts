import { z } from 'zod';

export const userValidationSchema = z.object({
  username: z.string().min(1),
  email: z.string().min(1),
  password: z.string(),
});

import z from 'zod';
import { errorMessage } from '../../utils/message/error-message.js';

export const userUpdateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, errorMessage.nameHaveAtLeast1Character),
  password: z.string().min(1, errorMessage.passwordHasAtLeast1Character),
  role: z.string(),
  status: z.string()
});

// convert from schema type to typescript object
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
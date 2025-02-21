import z from 'zod';
import { messageLog } from '../../utils/message-handling.js';

export const userUpdateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, messageLog.nameHaveAtLeast1Character),
  password: z.string().min(1, messageLog.passwordHasAtLeast1Character),
  role: z.string(),
});

// convert from schema type to typescript object
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
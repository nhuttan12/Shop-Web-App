import z from 'zod';
import { messageLog } from '../../utils/message-handling.js';

export const signInSchema = z.object({
  username: z.string().min(3, messageLog.usernameHaveAtLeast3Character),
  password: z.string().min(6, messageLog.passwordHasAtLeast6Character),
});

export type signInInput=z.infer<typeof signInSchema>;
import z from 'zod';
import { errorMessage } from '../../utils/message/error-message.js';

export const signInSchema = z.object({
  username: z.string().min(3, errorMessage.usernameHaveAtLeast3Character),
  password: z.string().min(6, errorMessage.passwordHasAtLeast6Character),
});

export type signInInput=z.infer<typeof signInSchema>;
import z from 'zod';
import { messageLog } from '../../utils/message-handling.js';

//create schema of user object for validation
export const signUpSchema = z
  .object({
    username: z.string().min(3, messageLog.usernameHaveAtLeast3Character),
    email: z.string().email(messageLog.emailIsNotValid),
    password: z.string().min(6, messageLog.passwordHasAtLeast6Character),
    retypePassword: z.string().min(6),
  })
  .superRefine((data, ctx) => {
    //Checking password and retypePassword are same
    if (data.password !== data.retypePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: messageLog.passwordAndRetypePasswordNotSame,
        path: ['retypePassword'],
      });
    }
  });

//convert from schema type to typescript object
export type signUpInput = z.infer<typeof signUpSchema>;

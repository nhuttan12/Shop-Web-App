import z from 'zod';
import { errorMessage } from '../../utils/message/error-message.js';

//create schema of user object for validation
export const signUpSchema = z
  .object({
    username: z.string().min(3, errorMessage.usernameHaveAtLeast3Character),
    email: z.string().email(errorMessage.emailIsNotValid),
    password: z.string().min(6, errorMessage.passwordHasAtLeast6Character),
    retypePassword: z.string(),
  })
  .superRefine((data, ctx) => {
    //Checking password and retypePassword are same
    if (data.password !== data.retypePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage.passwordAndRetypePasswordNotSame,
        path: ['retypePassword'],
      });
    }
  });

//convert from schema type to typescript object
export type signUpInput = z.infer<typeof signUpSchema>;

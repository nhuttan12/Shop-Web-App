import { errorMessage } from './../constants/ErrorMessage';
import { z } from 'zod';

export const signUpSchema = z
	.object({
		username: z.string().min(3, errorMessage.usernameHaveAtLeast3Character),
		email: z.string().email(errorMessage.emailIsNotValid),
		password: z.string().min(6, errorMessage.passwordHasAtLeast6Character),
		retypePassword: z.string().min(6),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.retypePassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorMessage.retypePasswordHaveToSamePassword,
				path: ['retypePassword'],
			});
		}
	});

export type signUpType = z.infer<typeof signUpSchema>;

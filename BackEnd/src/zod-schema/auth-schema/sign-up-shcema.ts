import z from 'zod';

//create schema of user object for validation
export const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 4 characters'),
  retypePassword: z.string().min(6, 'Password must be at least 4 characters'),
}).refine((data) => data.password === data.retypePassword, {
  message: 'Passwords do not match',
  path: ['retypePassword'],
});

//convert from schema type to typescript object
export type signUpInput = z.infer<typeof signUpSchema>;

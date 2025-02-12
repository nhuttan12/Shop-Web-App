import z from 'zod';

export const signInSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 4 characters'),
});

export type signInInput=z.infer<typeof signInSchema>;
import bcrypt from 'bcrypt';

import { signUpInput, signUpSchema } from './auth-shcema.js';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../utils/data-source.js';

export class AuthService {
  static async signUp(data: signUpInput) {
    try {
      //get data from schema of zod
      const parsedData = signUpSchema.parse(data);
      //check existing user
      const existingUser: User | null = await AppDataSource.getRepository(
        User
      ).findOneBy({
        email: parsedData.email,
        username: parsedData.username,
      });
      //throw error if user exists
      if (existingUser) {
        throw new Error('User already exists');
      }
      //create hashed password
      const hashedPassword: string = await bcrypt.hash(parsedData.password, 10);
      //create user
      const user = new User();
      user.username = parsedData.username;
      user.password = hashedPassword;
      user.email = parsedData.email;
      //save user to database
      const result: User = await AppDataSource.getRepository(User).save(user);
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

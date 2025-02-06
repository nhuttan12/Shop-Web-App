import bcrypt from 'bcrypt';

import { signUpInput, signUpSchema } from './auth-shcema.js';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../utils/data-source.js';
import { Role } from '../../entities/Role.js';
import { Status } from '../../entities/Status.js';

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

      //get role has name's 'user'
      const role: Role | null = await AppDataSource.getRepository(
        Role
      ).findOneBy({
        name: 'user',
      });

      //get status has name's 'active'
      const status: Status | null = await AppDataSource.getRepository(
        Status
      ).findOneBy({
        name: 'active',
      });

      //checking role or status null
      if(!role || !status) throw new Error(
        'Error in creating user, please try again'
      )
      //create user
      const user = new User();
      user.username = parsedData.username;
      user.password = hashedPassword;
      user.email = parsedData.email;
      user.name = 'Người dùng';
      user.role = role;
      user.status = status;

      //save user to database
      const result: User = await AppDataSource.getRepository(User).save(user);

      //update user's name concat id
      result.name = `${result.name} (${result.id})`;
      await AppDataSource.getRepository(User).save(result);

      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

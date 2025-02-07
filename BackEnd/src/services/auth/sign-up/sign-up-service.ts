import bcrypt from 'bcrypt';

import { signUpInput, signUpSchema } from './sign-up-shcema.js';
import { User } from '../../../entities/User.js';
import { AppDataSource } from '../../../utils/data-source.js';
import { Role } from '../../../entities/Role.js';
import { Status } from '../../../entities/Status.js';
import logger from '../../../utils/logger.js';

export class SignUpService {
  static async signUp(data: signUpInput) {
    try {
      //get data from schema of zod
      const parsedData = signUpSchema.parse(data);
      logger.data(`Parsed data ${parsedData}`);

      //check existing user
      const existingUser: User | null = await AppDataSource.getRepository(
        User
      ).findOneBy({
        email: parsedData.email,
        username: parsedData.username,
      });
      logger.info(`Checking exist user ${existingUser}`);

      //throw error if user exists
      if (existingUser) {
        logger.info(`User already exists ${existingUser}`);
        throw new Error('User already exists');
      }

      //create hashed password
      const hashedPassword: string = await bcrypt.hash(parsedData.password, 10);
      logger.data(`Create hashed password for user ${parsedData.username}`);

      //get role has name's 'user'
      const role: Role | null = await AppDataSource.getRepository(
        Role
      ).findOneBy({
        name: 'user',
      });
      logger.info(`Get role ${role}`);

      //get status has name's 'active'
      const status: Status | null = await AppDataSource.getRepository(
        Status
      ).findOneBy({
        name: 'active',
      });
      logger.info(`Get status ${status}`);

      //checking role or status null
      if (!role || !status) {
        logger.error(`Can't find role or status`);
        throw new Error('Error in creating user, please try again');
      }

      //create user
      const user = new User();
      user.username = parsedData.username;
      user.password = hashedPassword;
      user.email = parsedData.email;
      user.name = 'Người dùng';
      user.role = role;
      user.status = status;
      logger.info(`User's info ${user}`);

      //save user to database
      const result: User = await AppDataSource.getRepository(User).save(user);

      //update user's name concat id
      result.name = `${result.name} (${result.id})`;
      logger.info(`Update user's name ${result}`);
      await AppDataSource.getRepository(User).save(result);

      return result;
    } catch (error: any) {
      logger.error(`Error in sign up service ${error}`);
      throw error;
    }
  }
}

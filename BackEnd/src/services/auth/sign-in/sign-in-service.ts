import { signInInput, signInSchema } from './sign-in-schema.js';
import logger from '../../../utils/logger.js';
import { AppDataSource } from '../../../utils/data-source.js';
import { User } from '../../../entities/User.js';
import { Repository } from 'typeorm';

export class SignInService {
  static async signIn(data: signInInput) {
    try {
      //get data from zod
      const parsedData = signInSchema.parse(data);

      //get user repo
      const userRepo: Repository<User> =
        await AppDataSource.getRepository(User);

      //find user with name
      let user: User | null;
      user = await userRepo.findOneBy({ username: parsedData.username });

      //if user not found
      if (!user) {
        logger.data(`User not found ${user}`);
        throw new Error('User not found');
      }

      //set user to null
      user=null;

      //find user with username and password
      user = await userRepo.findOneBy({
        username: parsedData.username,
        password: parsedData.password,
      });

      //if no user found with username and password
      if(!user){
        logger.data(`User not found ${user}`);
        throw new Error('User not found');
      }
    } catch (error) {
      logger.error(`Error in sign in service ${error}`);
      throw error;
    }
  }
}

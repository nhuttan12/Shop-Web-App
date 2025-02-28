import bcrypt from 'bcrypt';

import { Role } from '../../../entities/Role.js';
import { Status } from '../../../entities/Status.js';
import { User } from '../../../entities/User.js';
import logger from '../../../utils/logger.js';
import {
  signUpInput,
  signUpSchema,
} from '../../../zod-schema/auth-schema/sign-up-shcema.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import { z } from 'zod';
import { errorMessage } from '../../../utils/message/error-message.js';

export class SignUpService {
  static async signUp(data: signUpInput) {
    try {
      //Get data from schema of zod
      const parsedData = signUpSchema.parse(data);
      logger.debug(`Parsed data ${parsedData}`);

      //Check existing user
      const existingUser: User | null = await User.findOne({
        where: [{ username: parsedData.username }, { email: parsedData.email }],
      });
      logger.debug(`Checking exist user ${existingUser}`);

      //Throw error if user exists
      if (existingUser) {
        logger.info(`User already exists ${existingUser}`);
        throw new ErrorHandler(errorMessage.usernameAlreadyExist, 406);
      }

      //Create hashed password
      const hashedPassword: string = await bcrypt.hash(parsedData.password, 10);
      logger.debug(`Create hashed password for user ${parsedData.username}`);

      //Get role has name's 'user'
      const role: Role | null = await Role.findOneBy({
        name: 'user',
      });
      logger.debug(`Get role ${role}`);

      //Get status has name's 'active'
      const status: Status | null = await Status.findOneBy({
        name: 'active',
      });
      logger.debug(`Get status ${status}`);

      //Checking role or status null
      if (!role || !status) {
        logger.error(`Can't find role or status`);
        throw new ErrorHandler(errorMessage.errorInCreateAccount, 404);
      }

      //Create user
      const user = new User();
      user.username = parsedData.username;
      user.password = hashedPassword;
      user.email = parsedData.email;
      user.name = 'Người dùng';
      user.role = role;
      user.status = status;
      logger.debug(`User's info ${user}`);

      //save user to database
      const result: User = await User.save(user);

      //update user's name concat id
      result.name = `${result.name} (${result.id})`;
      logger.debug(`Update user's name ${result}`);
      await User.save(result);

      return result;
    } catch (error: any) {
      logger.error(`Error in sign-up service: ${error}`);
      if(error instanceof z.ZodError){
        throw error;
      }
      throw new ErrorHandler(errorMessage.internalServerError, 500);
    }
  }
}

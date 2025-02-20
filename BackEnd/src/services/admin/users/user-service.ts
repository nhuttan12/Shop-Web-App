import { Role } from '../../../entities/Role.js';
import { User } from '../../../entities/User.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { messageLog } from '../../../utils/message-handling.js';
import {
  UserUpdateInput,
  userUpdateSchema,
} from '../../../zod-schema/admin/user-schema.js';

export class UserService {
  static async getUsers(page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get user and total number
      const [users, total]: [User[], number] = await User.findAndCount({
        skip,
        take: limit,
        relations: ['status', 'role'],
        order: { id: 'ASC' },
      });
      logger.debug(`Get users ${users} and total ${total}`);

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: users,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' get users function',
        error
      );
      throw new ErrorHandler(messageLog.internalServerError, 500);
    }
  }

  static async getUserById(id: number) {
    try {
      //get user by id
      const user: User | null = await User.findOneBy({ id });
      logger.debug(`Get user ${JSON.stringify(user)}`);

      //checking user exist
      if (!user) {
        throw new ErrorHandler(messageLog.userNotExist, 404);
      }

      return user;
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' get userById function',
        error
      );
      throw new ErrorHandler(messageLog.internalServerError, 500);
    }
  }

  static async updateUser(userInput: UserUpdateInput) {
    try {
      const parsedData = userUpdateSchema.parse(userInput);

      //Get user by id
      const user: User | null = await User.findOneBy({ id: parsedData.id });
      logger.debug(`User ${JSON.stringify(user)}`);

      //Check user exist
      if (!user) {
        logger.error('User not found');
        throw new ErrorHandler(messageLog.userNotExist, 404);
      }

      //Get role by name
      const role: Role | null = await Role.findOneBy({ name: parsedData.role });
      logger.debug(`Get role ${JSON.stringify(role)}`);

      //Check role exist
      if (!role) {
        logger.error('Role not found');
        throw new ErrorHandler(messageLog.invalidRole, 404);
      }

      //Update user
      await User.createQueryBuilder()
        .update(User)
        .set({
          name: parsedData.name,
          password: parsedData.password,
          role: role,
        })
        .where('id= :id', { id: parsedData.id })
        .execute();
        
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' update user function',
        error
      );
      throw new ErrorHandler(messageLog.internalServerError, 500);
    }
  }
}

import { UserDTO } from '../../../dtos/user-dto.js';
import { Role } from '../../../entities/Role.js';
import { Status } from '../../../entities/Status.js';
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
      logger.debug(`Get users list and total ${total}`);

      //loop through users array and convert all elements to userDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const userDTO: UserDTO[] = [];
      users.forEach(user => {
        userDTO.push(UserDTO.fromEntity(user));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: userDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' get users function',
        error
      );
      throw new ErrorHandler(messageLog.errorInGetUsersInfo, 500);
    }
  }

  static async getUserById(id: number, page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get user by id
      const [users, total]: [User[], number] = await User.createQueryBuilder(
        'user'
      )
        .leftJoinAndSelect('user.status', 'status')
        .leftJoinAndSelect('user.role', 'role')
        .where('cast(user.id as char) like :idPattern', {
          idPattern: `%${id}%`,
        })
        .orderBy('user.id', 'ASC')
        .skip(skip)
        .take(limit)
        .getManyAndCount();
      logger.debug(`Get products list and total ${total}`);

      //checking user exist
      logger.debug(`Check user list`);
      if (!users) {
        logger.error('User not found');
        throw new ErrorHandler(messageLog.userNotExist, 404);
      }

      //loop through users array and convert all elements to userDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const userDTO: UserDTO[] = [];
      users.forEach(user => {
        userDTO.push(UserDTO.fromEntity(user));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: userDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' get userById function:',
        error
      );
      throw new ErrorHandler(messageLog.errorInGetUserInfoById, 500);
    }
  }

  static async getUserByName(name: string, page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get user by id
      const [users, total]: [User[], number] = await User.createQueryBuilder(
        'user'
      )
        .leftJoinAndSelect('user.status', 'status')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.name like :namePattern', {
          namePattern: `%${name}%`,
        })
        .orderBy('user.id', 'ASC')
        .skip(skip)
        .take(limit)
        .getManyAndCount();
      logger.debug(`Get products list and total ${total}`);

      //checking user exist
      logger.debug(`Check user list`);
      if (!users) {
        logger.error('User not found');
        throw new ErrorHandler(messageLog.userNotExist, 404);
      }

      //loop through users array and convert all elements to userDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const userDTO: UserDTO[] = [];
      users.forEach(user => {
        userDTO.push(UserDTO.fromEntity(user));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: userDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' get getUserByName function:',
        error
      );
      throw new ErrorHandler(messageLog.errorInGetUserInfoById, 500);
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

      //Get status by name
      const status: Status | null = await Status.findOneBy({
        name: parsedData.status,
      });
      logger.debug(`Get role ${JSON.stringify(role)}`);

      //Check status exist
      if (!status) {
        logger.error('Status not found');
        throw new ErrorHandler(messageLog.invalidStatus, 404);
      }

      //Update user
      return await User.createQueryBuilder()
        .update(User)
        .set({
          name: parsedData.name,
          password: parsedData.password,
          role: role,
          status: status,
        })
        .where('id= :id', { id: parsedData.id })
        .execute();
    } catch (error) {
      logger.error(
        messageLog.errorInUserService + ' updateUser function:',
        error
      );
      throw new ErrorHandler(messageLog.errorInUpdateUserInfo, 500);
    }
  }

  static async banUser(id: number) {
    try {
      //find user with user id
      const user: User | null = await User.findOneBy({ id });
      logger.debug(`User ${user}`);

      //checking user exists
      if (!user) {
        logger.error('User not found');
        throw new ErrorHandler(messageLog.productNotFound, 404);
      }

      //find status with status name
      const status: Status | null = await Status.findOneBy({ name: 'Delete' });
      logger.debug(`Status: ${status}`);

      //checking status exists
      if (!status) {
        logger.error('Status not found');
        throw new ErrorHandler(messageLog.invalidStatus, 404);
      }

      //soft user product
      logger.debug('Status updated');
      return await User.createQueryBuilder()
        .update(User)
        .set({
          status: status,
        })
        .where('id= :id', { id })
        .execute();
    } catch (error) {
      logger.error(messageLog.errorInUserService + ' banUser function', error);
      throw new ErrorHandler(messageLog.errorInBanUserBaseOnId, 500);
    }
  }
}

import { User } from '../../../entities/User.js';
import logger from '../../../utils/logger.js';

export class UserService {
  static async getUsers(page: number = 1, limit: number = 10) {
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
      logger.error('Error in user-service', error);
      throw error;
    }
  }
}

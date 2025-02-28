import { NextFunction, Request, Response } from 'express';

import { UserService } from '../../../services/admin/users-service/user-service.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { errorMessage } from '../../../utils/message/error-message.js';
import { notifyMessage } from '../../../utils/message/notify-message.js';

export class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      //get page and limit from request
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      logger.debug('page: ' + page + ' limit: ' + limit);

      //get users from UserService and send response to client
      const users = await UserService.getUsers(page, limit);
      logger.debug('users: ' + JSON.stringify(users));

      if (!users) {
        logger.error('No users found');
        throw new ErrorHandler(errorMessage.userNotFound, 404); //No users found
      }
      res.status(200).json(users);
    } catch (error) {
      logger.error(
        errorMessage.errorInUserAdminController + ' getUsers function',
        error
      );
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id, page and limit from request parameters
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      const id: number = Number(req.params.id);
      logger.debug(
        'User id from request: ' + id,
        'page: ' + page + ' limit: ' + limit
      );

      //Checking id is number
      if (isNaN(id)) {
        logger.error(`Invalid user id ${id}`);
        throw new ErrorHandler(errorMessage.invalidUserId, 400);
      }

      //Get user information from UserService and send response to client
      const users = await UserService.getUserById(id, page, limit);
      logger.debug('User info from request: ' + users);

      if (!users) {
        logger.error(`User not found with id ${id}`);
        throw new ErrorHandler(errorMessage.userNotFound, 404); //user not found
      }
      res.status(200).json(users);
    } catch (error) {
      logger.error(
        errorMessage.errorInUserAdminController + ' getUserById function:',
        error
      );
      next(error);
    }
  }

  static async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id, page and limit from request parameters
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      const name: string = req.params.name;
      logger.debug(
        'User name from request: ' + name,
        'page: ' + page + ' limit: ' + limit
      );

      //check user name is existing
      if(!name){
        logger.error('Name is null');
        throw new ErrorHandler(errorMessage.dataInvalid, 400); //data missing required fields
      }

      //Get user information from UserService and send response to client
      const users = await UserService.getUserByName(name, page, limit);
      logger.debug('users: ' + JSON.stringify(users));

      if (!users) {
        logger.error(`User not found with name ${name}`);
        throw new ErrorHandler(errorMessage.userNotFound, 404); //user not found
      }
      res.status(200).json(users);
    } catch (error) {
      logger.error(
        errorMessage.errorInUserAdminController + ' getUserByName function:',
        error
      );
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id from request parameters
      const id: number = Number(req.params.id);
      logger.debug('User id from request: ' + id);

      //Checking id is number
      if (isNaN(id)) {
        logger.error(`Invalid user id ${id}`);
        throw new ErrorHandler(errorMessage.invalidUserId, 400);
      }

      //Get user data from request body
      const { name, password, role, status } = req.body;
      logger.debug(
        `User data from request: ${name} ${password} ${role} ${status}`
      );

      //check if all required fields are provided
      if (!name || !password || !role || !status) {
        logger.error('Data missing required fields');
        throw new ErrorHandler(errorMessage.dataInvalid, 400);
      }

      //Update user
      logger.silly('Update user');
      const result = await UserService.updateUser({
        id,
        name,
        password,
        role,
        status,
      });

      //check if user is updated successfully
      if (result.affected && result.affected > 1) {
        res.status(200).json({ message: notifyMessage.dataUpdated });
      } else {
        throw new ErrorHandler(errorMessage.errorInUpdateUserInfo, 500);
      }
    } catch (error) {
      logger.error(
        errorMessage.errorInUserAdminController + ' updateUser function: ',
        error
      );
      next(error);
    }
  }

  static async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id from request parameters
      const id: number = Number(req.params.id);
      logger.debug('User id from request: ' + id);

      //Checking id is number
      if (isNaN(id)) {
        logger.error(`Invalid user id ${id}`);
        throw new ErrorHandler(errorMessage.invalidUserId, 400);
      }

      //Update user
      logger.silly('Ban user');
      const result = await UserService.banUser(id);
      if (result.affected && result.affected > 0) {
        res.status(200).json({ message: errorMessage.userBanned });
      } else {
        throw new ErrorHandler(errorMessage.errorInBanUserBaseOnId, 500);
      }
    } catch (error) {
      logger.error(
        errorMessage.errorInUserAdminController + ' banUser function',
        error
      );
      next(error);
    }
  }
}

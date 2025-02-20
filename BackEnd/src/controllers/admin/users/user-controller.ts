import { NextFunction, Request, Response } from 'express';

import { UserService } from '../../../services/admin/users/user-service.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { messageLog } from '../../../utils/message-handling.js';

export class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      //get page and limit from request
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      logger.debug('page: ' + page + ' limit: ' + limit);

      //get users from UserService and send response to client
      const result = await UserService.getUsers(page, limit);
      logger.debug('result: ' + result);

      res.status(200).json(result);
    } catch (error) {
      logger.error('Error in getUsers controller', error);
      next(new ErrorHandler('Error in getUsers controller', 500));
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id from request parameters
      const id: number = Number(req.params.id) || 0;
      logger.debug('User id from request: ' + id);

      //Get user information from UserService and send response to client
      const user = await UserService.getUserById(id);
      logger.debug('User info from request: ' + user);

      res.status(200).json(user);
    } catch (error) {
      logger.error('Error getting user information', error);
      next(new ErrorHandler('Error getting user information', 500));
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      //Get user id from request parameters
      const id: number=Number(req.params.id);
      logger.debug('User id from request: ' + id);

      //Checking id is number 
      if(isNaN(id)){
        logger.error(`Invalid user id ${id}`);
        throw new ErrorHandler('Invalid user id', 400);
      }

      //Get user data from request body
      const {name, password, role}= req.body;
      logger.debug(`User data from request: ${name} ${password} ${role}`);

      //check if all required fields are provided
      if(!name||!password||!role){
        logger.error('Data missing required fields');
        throw new ErrorHandler(messageLog.dataInvalid, 400);
      }
      //Update user
      await UserService.updateUser({id, name, password, role});

      res.status(200).json({message: messageLog.dataUpdated});
    } catch (error) {
      logger.error('Error updating user', error);
      next(new ErrorHandler('Error updating user', 500));   
    }
  }
}

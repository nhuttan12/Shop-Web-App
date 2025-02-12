import { NextFunction, Request, Response } from 'express';

import { UserService } from '../../../services/admin/users/user-service.js';
import logger from '../../../utils/logger.js';

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
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';

import { SignUpService } from '../../services/auth/sign-up/sign-up-service.js';
import { User } from '../../entities/User.js';
import logger from '../../utils/logger.js';

export class SignUpController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      //get username, email, password, retypePassword from request
      const { username, email, password, retypePassword } = req.body;
      logger.info(`Sign up request ${username}, ${email}, ${password}, ${retypePassword}`);

      //sign up with username, email, password, retypePassword
      const result: User = await SignUpService.signUp({
        username,
        email,
        password,
        retypePassword,
      });
      logger.info(`User created ${result}`);

      res
        .status(201)
        .json({ message: 'User created successfully', data: result });
    } catch (error: any) {
      logger.error(`Error in sign up controller ${error}`);
      next(error);
    }
  }
}

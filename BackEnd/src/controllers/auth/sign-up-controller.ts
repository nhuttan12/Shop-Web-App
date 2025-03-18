import { NextFunction, Request, Response } from 'express';

import { SignUpService } from '../../services/auth/sign-up/sign-up-service.js';
import logger from '../../utils/logger.js';
import { notifyMessage } from '../../utils/message/notify-message.js';
import { messageLog } from '../../utils/message/message-log.js';

export class SignUpController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    let username: string = '',
      email: string = '',
      password: string = '',
      retypePassword: string = '';
    try {
      //get username, email, password, retypePassword from request
      ({ username, email, password, retypePassword } = req.body);
      logger.debug(
        `Sign up request ${username}, ${email}, ${password}, ${retypePassword}`
      );

      //sign up with username, email, password, retypePassword
      logger.silly(
        'Sign up user with username, email, password, retypePassword'
      );
      await SignUpService.signUp({
        username,
        email,
        password,
        retypePassword,
      });

      res.status(200).json({ message: notifyMessage.userCreateSuccess });
    } catch (error: any) {
      logger.error(`${messageLog.errorInSignUpController}: ${error}`);
      next(error);
    } finally {
      logger.info(`${messageLog.accountIsSignUp} ${email}`);
    }
  }
}

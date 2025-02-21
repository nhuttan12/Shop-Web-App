import { NextFunction, Request, Response } from 'express';

import { SignUpService } from '../../services/auth/sign-up/sign-up-service.js';
import { User } from '../../entities/User.js';
import logger from '../../utils/logger.js';
import { messageLog } from '../../utils/message-handling.js';
import { z } from 'zod';
import { ErrorHandler } from '../../utils/error-handling.js';

export class SignUpController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      //get username, email, password, retypePassword from request
      const { username, email, password, retypePassword } = req.body;
      logger.debug(
        `Sign up request ${username}, ${email}, ${password}, ${retypePassword}`
      );

      //sign up with username, email, password, retypePassword
      logger.silly('Sign up user with username, email, password, retypePassword');
      await SignUpService.signUp({
        username,
        email,
        password,
        retypePassword,
      });

      res.status(201).json({ message: messageLog.userCreateSuccess });
    } catch (error: any) {
      logger.error(`Error in sign-up-controller: ${error}`);
      //if zod's error, return the detail message
      if (error instanceof z.ZodError) {
        res.status(400).json({
          status: 'lỗi',
          error: error.issues.map(issue => issue.message).join(', '),
        });
        return;
      }else{
        next(new ErrorHandler(messageLog.internalServerError, 500));
      }
    }
  }
}

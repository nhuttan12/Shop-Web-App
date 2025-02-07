import { NextFunction, Request, Response } from 'express';
import logger from '../../utils/logger.js';
import { SignInService } from '../../services/auth/sign-in/sign-in-service.js';

export class SignInController {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      //get username and password from request
      const {username, password}=req.body;
      logger.info(`Sign in request ${username}, ${password}`);

      //sign in with username and password
      const result=SignInService.signIn({username, password});
      logger.info(`Sign in result ${result}`);

      return res.status(200).json({message:'Sign in successfully', data:result});
    }catch (error) {
      logger.error(`Error in sign in controller ${error}`);
      throw error;
    }
  }
}
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ErrorHandler } from '../utils/error-handling.js';
import logger from '../utils/logger.js';
import { messageLog } from '../utils/message-handling.js';

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  return passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: any, info: any) => {
      logger.info('Checking error');
      if (err) {
        logger.error(`Error in auth-jwt-passport: ${err.message}`);
        return next(err);
      }

      //User not found
      logger.info(`Checking user exists ${JSON.stringify(user)}`);
      if (!user) {
        //checking info have error message
        logger.info('Checking info have error message');
        if (info && info.message) {
          logger.info(`Authenticated failed: ${info.message}`);
          res.status(400).json({ message: info.message });
          return;
        } else {
          logger.info(`Invalid credentials`);
          return next(
            new ErrorHandler(messageLog.invalidUsernameOrPassword, 406)
          );
        }
      }

      //save user to response local
      logger.silly('Save user to response local');
      res.locals.user=user;

      next();
    }
  )(req, res, next);
};

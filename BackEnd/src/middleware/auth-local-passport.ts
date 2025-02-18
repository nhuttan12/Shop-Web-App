import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../utils/logger.js';
import { ErrorHandler } from '../utils/error-handling.js';
import { messageLog } from '../utils/message-handling.js';
import { env } from '../configs/env.js';

export const authenticateLocal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate(
    'local',
    { session: false },
    (err: any, user: any, info: any) => {
      //Error
      if (err) {
        logger.error(`Error: ${err.message}`);
        return next(err);
      }

      //User not found
      if (!user) {
        logger.info(`Invalid credentials`);
        return next(
          new ErrorHandler(messageLog.invalidUsernameOrPassword, 406)
        );
      }

      //Generate access token
      logger.silly(`Generate token`);
      const payload = { id: user.id };
      const accessToken: string = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: '1h',
      });

      //Generate refresh token
      logger.silly('Generate refresh token');
      const refreshToken: string = jwt.sign(
        payload,
        env.REFRESH_TOKEN_PRIVATE_KEY,
        {
          expiresIn: '7d',
        }
      );

      //Save token to local storage
      logger.debug('Save token to local storage');
      res.locals.accessToken = accessToken;
      res.locals.refreshToken = refreshToken;
      res.locals.user = user;

      next();
    }
  )(req, res, next);
};

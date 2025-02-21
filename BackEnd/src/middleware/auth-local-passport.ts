import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { env } from '../environment/env.js';
import { ErrorHandler } from '../utils/error-handling.js';
import logger from '../utils/logger.js';
import { messageLog } from '../utils/message-handling.js';

export const authenticateLocal = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
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
        //checking info have error message
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

      const accessTokenExpiresTime: number = Number(
        env.EXPIRE_ACCESS_TOKEN_PRIVATE_KEY
      );
      const refreshTokenExpiresTime: number = Number(
        env.EXPIRE_REFRESH_TOKEN_PRIVATE_KEY
      );

      if (!accessTokenExpiresTime || !refreshTokenExpiresTime) {
        throw new ErrorHandler('Invalid expiresIn value', 500);
      }

      //Generate access token
      logger.silly(`Generate token`);
      const payload = { id: user.id };
      const accessToken: string = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: accessTokenExpiresTime,
      });

      //Generate refresh token
      logger.silly('Generate refresh token');
      const refreshToken: string = jwt.sign(
        payload,
        env.REFRESH_TOKEN_PRIVATE_KEY,
        {
          expiresIn: refreshTokenExpiresTime,
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

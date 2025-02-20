import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { env } from '../configs/env.js';
import logger from '../utils/logger.js';
import { ErrorHandler } from '../utils/error-handling.js';

export const refreshTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const refreshToken = req.headers['refresh-token'];
  if (!refreshToken || typeof refreshToken !== 'string') {
    res.status(401).json({ error: 'Refresh token is not provided' });
    return;
  }
  jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_PRIVATE_KEY,
    (error, decoded: any) => {
      if (error) {
        logger.error('Refresh token is not valid or expired', error);
        next(new ErrorHandler('Refresh token is not valid or expired', 401));
        return;
      }

      const payload = { id: decoded.id };

      const accessTokenExpiresTime: number = Number(
        env.EXPIRE_ACCESS_TOKEN_PRIVATE_KEY
      );
      const refreshTokenExpiresTime: number = Number(
        env.EXPIRE_REFRESH_TOKEN_PRIVATE_KEY
      );

      if (!accessTokenExpiresTime || !refreshTokenExpiresTime) {
        throw new ErrorHandler('Invalid expiresIn value', 500);
      }

      const accessToken = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: accessTokenExpiresTime,
      });

      const refreshToken=jwt.sign(payload, env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: refreshTokenExpiresTime,
      });

      res.locals.accessToken=accessToken;
      res.locals.refreshToken=refreshToken;

      next();
    }
  );
};

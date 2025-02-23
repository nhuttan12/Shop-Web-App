import { NextFunction, Request, Response } from 'express';
import { messageLog } from '../utils/message-handling.js';

export const StoreToken = (req: Request, res: Response, next: NextFunction): void => {
  res.json({
    message: messageLog.logInSuccessfully,
    accessToken: res.locals.accessToken,
    refreshToken: res.locals.refreshToken,
  });
};

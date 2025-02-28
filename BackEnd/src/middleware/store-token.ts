import { NextFunction, Request, Response } from 'express';
import { notifyMessage } from '../utils/message/notify-message.js';

export const StoreToken = (req: Request, res: Response, next: NextFunction): void => {
  res.json({
    message: notifyMessage.logInSuccessfully,
    accessToken: res.locals.accessToken,
    refreshToken: res.locals.refreshToken,
  });
};

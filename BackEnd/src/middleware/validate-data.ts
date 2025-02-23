import { NextFunction, Request, Response } from 'express';
import { signInSchema } from '../zod-schema/auth-schema/sign-in-schema.js';
import logger from '../utils/logger.js';

export const ValidateData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //get data from request
  const parsedData = signInSchema.safeParse(req.body);
  logger.info(`Get data from request ${JSON.stringify(req.body)}`);

  //checking data parsing process
  logger.info(`Checking data parsing process`);
  if (!parsedData.success) {
    res.status(404).json({ error: parsedData.error.errors });
    return;
  }
  next();
};

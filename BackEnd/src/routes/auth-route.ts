import { NextFunction, Request, Response, Router } from 'express';

import { SignUpController } from '../controllers/auth/sign-up-controller.js';
import { authenticateLocal } from '../middleware/auth-local-passport.js';
import { refreshTokenMiddleware } from '../middleware/refresh-token.js';
import logger from '../utils/logger.js';
import { messageLog } from '../utils/message-handling.js';
import { signInSchema } from '../zod-schema/auth-schema/sign-in-schema.js';

const router = Router();

router.post('/sign-up', SignUpController.signUp);

router.post(
  '/sign-in',
  (req: Request, res: Response, next: NextFunction) => {
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
  },
  authenticateLocal,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: messageLog.logInSuccessfully,
      accessToken: res.locals.accessToken,
      refreshToken: res.locals.refreshToken,
    });
  }
);

router.post(
  '/refresh-token',
  refreshTokenMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: messageLog.tokenRefreshedSuccessful,
      accessToken: res.locals.accessToken,
      refreshToken: res.locals.refreshToken,
    })
  }
);

export { router as authRoute };

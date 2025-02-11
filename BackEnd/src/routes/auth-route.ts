import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from 'express';

import { SignUpController } from '../controllers/auth/sign-up-controller.js';
import { signInSchema } from '../services/auth/sign-in/sign-in-schema.js';
import passport from 'passport';
import { env } from '../configs/env.js';
import logger from '../utils/logger.js';

const router = Router();

router.post('/sign-up', SignUpController.signUp);

router.post('/sign-in', (req: Request, res: Response, next: NextFunction) => {
  //get data from request
  const parsedData = signInSchema.safeParse(req.body);
  logger.info(`Get data from reqeust ${req.body}`);

  //checking data parsing process
  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error.errors });
  }
  logger.info(`Checking data parsing process`);

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
      if (!user){
        logger.info(`Invalid credentials`);
        return next(new Error(info?.message||'Tài khoản hoặc mật khẩu không tồn tại'));
      }

      //Generate token
      logger.info(`Generate token`);
      const token:string = jwt.sign({ id: user.id }, env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ message: 'Đăng nhập thành công', token: token });
    }
  )(req, res, next);
});

export { router }
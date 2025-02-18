import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { env } from './configs/env.js';
import { AppDataSource } from './utils/data-source.js';
import { router as authRoute } from './routes/auth-route.js';
import { router as manageUserRoute } from './routes/admin/user-route.js';
import './utils/passport.js';
import logger from './utils/logger.js';
import { messageLog } from './utils/message-handling.js';

const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/auth', authRoute);

app.use('/admin-auth', manageUserRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  if(err.isOperational){
    res.status(err.statusCode).json({ status: err.status ,error: err.message });
  }else{
    logger.error(`Error ${err}`);
    res.status(500).json({ status: 500, message: messageLog.internalServerError });
  }
});

const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    logger.silly(messageLog.databaseInitialize+' in app.ts');

    app.listen(env.SERVER_PORT, () => {
      logger.debug(`Server running in ${env.SERVER_PORT}`);
    });
  } catch (error) {
    logger.error('Error in: ', error);
    process.exit(1);
  }
};

startServer();

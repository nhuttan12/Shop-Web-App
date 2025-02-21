import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';


import './utils/passport.js';
import logger from './utils/logger.js';
import { env } from './environment/env.js';
import { AppDataSource } from './configs/data-source.js';
import { authRoute } from './routes/auth-route.js';
import { manageUserRoute } from './routes/admin/user-route.js';
import { messageLog } from './utils/message-handling.js';
import { StatusBaseData } from './base-data/status-base-data.js';
import { RolesBaseData } from './base-data/roles-base-data.js';

const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/auth', authRoute);

app.use('/auth/v2', manageUserRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error message:',err.message);
  if(err.isOperational){
    logger.error('Error message is operational:',err.message);
    res.status(err.statusCode).json({ status: err.status ,error: err.message });
  }else{
    logger.error(`Global error in app.ts: ${err}`);
    res.status(500).json({ status: 500, message: messageLog.internalServerError });
  }
});

const startServer = async (): Promise<void> => {
  try {
    logger.silly('Assuming we have base data insertion in separate classes and methods');
    const statusBaseData=new StatusBaseData();
    const roleBaseData=new RolesBaseData();

    await AppDataSource.initialize();
    logger.silly(messageLog.databaseInitialize+' in app.ts');

    logger.silly('Insert base data in tables before starting server.');
    await statusBaseData.insertBaseStatusData();
    await roleBaseData.insertBaseRoleData();

    app.listen(env.SERVER_PORT, () => {
      logger.debug(`Server running in ${env.SERVER_PORT}`);
    });
  } catch (error) {
    logger.error('Error in: ', error);
    process.exit(1);
  }
};

startServer();

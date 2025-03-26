//import library
import 'reflect-metadata';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

//import variables from file
import './utils/passport.js';
import logger from './utils/logger.js';
import { env } from './configs/env.js';
import { AppDataSource } from './configs/data-source.js';
import { authRoute } from './routes/user/auth-route.js';
import { manageUserRoute } from './routes/admin/user-route.js';
import { StatusBaseData } from './base-data/status-base-data.js';
import { RolesBaseData } from './base-data/roles-base-data.js';
import { CloudinaryStorageRoute } from './routes/cloudinary/cloudinary-route.js';
import { globalExceptionHandler } from './middleware/global-exception-handler.js';
import { messageLog } from './utils/message/message-log.js';

const app: Application = express();

//config for cors
app.use(
  cors({
    origin: env.FRONT_END_HOST,
    preflightContinue: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

//config for body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//config for passport
app.use(passport.initialize());

//config for routes
app.use('/auth', authRoute);
app.use('/auth/v2', manageUserRoute);
app.use('/uploads', CloudinaryStorageRoute);

//config for global exception handler
app.use(globalExceptionHandler);

//start server
const startServer = async (): Promise<void> => {
  try {
    logger.silly(
      'Assuming we have base data insertion in separate classes and methods'
    );
    const statusBaseData = new StatusBaseData();
    const roleBaseData = new RolesBaseData();

    await AppDataSource.initialize();
    logger.silly(messageLog.databaseInitialize + ' in app.ts');

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

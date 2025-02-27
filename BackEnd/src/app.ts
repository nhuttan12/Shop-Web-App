//import library
import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors'; 
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
// import 

//import variables from file
import './utils/passport.js';
import logger from './utils/logger.js';
import { env } from './configs/env.js';
import { AppDataSource } from './configs/data-source.js';
import { authRoute } from './routes/user/auth-route.js';
import { manageUserRoute } from './routes/admin/user-route.js';
import { messageLog } from './utils/message-handling.js';
import { StatusBaseData } from './base-data/status-base-data.js';
import { RolesBaseData } from './base-data/roles-base-data.js';

const app: Application = express();

//config for cors
app.use(cors({ 
  origin: 'localhost:3000', 
  preflightContinue: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))

//config for body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//config for passport
app.use(passport.initialize());

//config for routes
app.use('/auth', authRoute);

app.use('/auth/v2', manageUserRoute);

//config for global exception handler
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

//config for cloudinary
(async function(){
  cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    secure: env.SECURE==='true',
    api_key: env.API_KEY,
    api_secret: env.API_SECRET,
  })
})();


//config for multer
const uploadCloud=multer({})

//start server
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

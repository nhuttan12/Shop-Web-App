import "reflect-metadata";

import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import {env} from './configs/env.js';
import {AppDataSource} from './utils/data-source.js';
import router from './routes/auth-route.js';

const app: Application = express();

app.use(bodyParser.json());

app.use('/auth', router);

app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const data = err.data;
  res.status(status).json({message, data});
  next();
})

const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Db connected');

    app.listen(env.SERVER_PORT, () => {
      console.log(`Server running in ${env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error in: ', error);
    process.exit(1);
  }
};

startServer();
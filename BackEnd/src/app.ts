import "reflect-metadata";

import express, { Application } from 'express';
import bodyParser from 'body-parser';

import {env} from './configs/env.js';
import {AppDataSource} from './utils/data-source.js';

const app: Application = express();

app.use(bodyParser.json());

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
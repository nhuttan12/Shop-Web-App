import 'dotenv/config';
import "reflect-metadata";
import {AppDataSource} from './utils/data-source.js';

import express, { Application } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());

const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Db connected');

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running in ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error in: ', error);
    process.exit(1);
  }
};

startServer();
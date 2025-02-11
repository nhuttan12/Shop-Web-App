import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { env } from './configs/env.js';
import { AppDataSource } from './utils/data-source.js';
import { router as authRoute } from './routes/auth-route.js';
import './utils/passport.js';
import logger from './utils/logger.js';

const app: Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/auth', authRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(400).json({ error: err.message });
  next();
});

const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized in app.ts');

    app.listen(env.SERVER_PORT, () => {
      console.log(`Server running in ${env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error in: ', error);
    process.exit(1);
  }
};

startServer();

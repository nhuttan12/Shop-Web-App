import 'dotenv/config';
import 'reflect-metadata';

import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { connectDb } from './utils/db-connector.js';

const app: Application = express();

app.use(bodyParser.json());

const startServer = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`✅ Server khởi động ở cổng ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error('❌ Lỗi khi khởi động ứng dụng:', error);
    process.exit(1);
  }
};

startServer();
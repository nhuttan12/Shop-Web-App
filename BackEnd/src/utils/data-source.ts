import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { env } from '../configs/env.js';
import logger from './logger.js';
import { messageLog } from './message-handling.js';

export const AppDataSource = new DataSource({
  type: env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  dropSchema: false,
  synchronize: false,
  logging: true,
  entities: [join(process.cwd(), 'src', 'entities', '*.ts')],
  migrations: [join(process.cwd(), 'src', 'migrations', '*.ts')],
  subscribers: [],
  extra: {
    connectionLimit: 10,
    connectTimeout: 600000,
  },
});

AppDataSource.initialize()
  .then(() => logger.debug(messageLog.databaseInitialize))
  .catch(() => logger.error(messageLog.databaseNotInitialize));

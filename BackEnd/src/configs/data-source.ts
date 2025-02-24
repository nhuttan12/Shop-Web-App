import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { env } from './env.js';
import logger from '../utils/logger.js';
import { messageLog } from '../utils/message-handling.js';

const entitiesSrc: string[] = [join(process.cwd(), 'src', 'entities', '*.ts')];
const migrationsSrc: string[] = [
  join(process.cwd(), 'src', 'migrations', '*.ts'),
];

const entitiesDist: string[] = [
  join(process.cwd(), 'dist', 'entities', '*.js'),
];
const migrationsDist: string[] = [
  join(process.cwd(), 'dist', 'migrations', '*.js'),
];

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
  entities: env.STATUS === 'production' ? entitiesDist : entitiesSrc,
  migrations: env.STATUS === 'production' ? migrationsDist : migrationsSrc,
  subscribers: [],
  extra: {
    connectionLimit: 10,
    connectTimeout: 600000,
  },
});

AppDataSource.initialize()
  .then(() => logger.debug(messageLog.databaseInitialize))
  .catch(() => logger.error(messageLog.databaseNotInitialize));

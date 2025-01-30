import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { env } from '../configs/env.js';

export const AppDataSource = new DataSource({
  type: env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  dropSchema: env.STATUS==='development',
  synchronize: env.STATUS==='development',
  logging: true,
  entities: [join(process.cwd(), 'src', 'entities', '*.ts')],
  migrations: [join(process.cwd(), 'src', 'migration', '*.ts')],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log('Db connected'))
  .catch(() => console.log('Db error connection'));

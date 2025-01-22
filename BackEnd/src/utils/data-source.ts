import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log('Db connected'))
  .catch(() => console.log('Db error connection'));

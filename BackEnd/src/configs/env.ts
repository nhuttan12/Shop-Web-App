import { config } from 'dotenv-safe';
import { join } from 'path';

config({
  path: join(process.cwd(), 'src', 'configs', '.env'),
  example: join(process.cwd(), 'src', 'configs', '.env.example'),
  allowEmptyValues: true,
});

export const env = {
  DB_DIALECT: process.env.DB_DIALECT as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mssql',
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  SERVER_PORT: Number(process.env.SERVER_PORT!),
  STATUS: process.env.STATUS!,
  JWT_SECRET: process.env.JWT_SECRET!,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY!,
  EXPIRE_ACCESS_TOKEN_PRIVATE_KEY: process.env.EXPIRE_ACCESS_TOKEN_PRIVATE_KEY!,
  EXPIRE_REFRESH_TOKEN_PRIVATE_KEY: process.env.EXPIRE_REFRESH_TOKEN_PRIVATE_KEY!,
};

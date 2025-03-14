import { config } from 'dotenv-safe';
import { join } from 'path';

config({
  path: join(process.cwd(), '.env'),
  example: join(process.cwd(), '.env.example'),
  allowEmptyValues: true,
});

export const env = {
  //Database configuration
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
  //Application configuration
  SERVER_PORT: Number(process.env.SERVER_PORT!),
  STATUS: process.env.STATUS!,
  //Jwt configuration
  JWT_SECRET: process.env.JWT_SECRET!,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY!,
  EXPIRE_ACCESS_TOKEN_PRIVATE_KEY: process.env.EXPIRE_ACCESS_TOKEN_PRIVATE_KEY!,
  EXPIRE_REFRESH_TOKEN_PRIVATE_KEY: process.env.EXPIRE_REFRESH_TOKEN_PRIVATE_KEY!,
  //Cloudinary configuration
  CLOUD_NAME: process.env.CLOUD_NAME!,
  SECURE: process.env.SECURE!,
  API_KEY: process.env.API_KEY!,
  API_SECRET: process.env.API_SECRET!,
  FOLDER_NAME: process.env.FOLDER_NAME!,
  FRONT_END_HOST: process.env.FRONT_END_HOST!
};

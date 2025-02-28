import { config } from "dotenv-safe";
import {join} from 'path';

config({
  path: join(process.cwd(), '.env'),
  example: join(process.cwd(), '.env.example'),
  allowEmptyValues: true,
});

export const env={
  //Application configuration
  STATUS: process.env.STATUS!,
  SERVER_PORT: Number(process.env.SERVER_PORT!)
}
import 'winston-daily-rotate-file';

import winston, { format, Logger } from 'winston';
import { env } from '../environment/env.js';

//config format of log
const logFormat=format.combine(
  format.timestamp({format:'DD-MM-YYYY HH:mm:ss'}),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
)

//print to console for log's level is info level up
const consoleTransport=new winston.transports.Console({
  level:'silly',
});

//write to file for log's level is info level up
const fileTransport=new winston.transports.DailyRotateFile({
  level:'info',
  filename:'./src/logs/app-%DATE%.log',
  datePattern:'DD-MM-YYYY-HH',
  zippedArchive:true,
  maxSize:'20m',
  maxFiles:'14d'
});

const transports: winston.transport[]=[fileTransport];
if(env.STATUS==='development'){
  transports.push(consoleTransport);
}

const logger: Logger=winston.createLogger({
  format: logFormat,
  transports: transports,
});

export default logger;
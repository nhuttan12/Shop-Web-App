import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';
import { z } from 'zod';
import { ErrorHandler } from '../utils/error-handling.js';
import { errorMessage } from '../utils/message/error-message.js';

const globalExceptionHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): any => {
  logger.error(err.message);

  //Checking if error is Zod (validate input)
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: err.issues.map((issue: any) => issue.message),
      path: err.issues.map((issue: any) => issue.path[0]),
    });
  }

  //Checking error is in ErrorHandler (control error)
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  //If undefined error, return 500 status code
  logger.error('Error message:', err.message);
  if (err.isOperational) {
    logger.error('Error message is operational:', err.message);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    logger.error(`Global error in app.ts: ${err}`);
    res
      .status(500)
      .json({ status: 500, message: errorMessage.internalServerError });
  }
};

export { globalExceptionHandler };

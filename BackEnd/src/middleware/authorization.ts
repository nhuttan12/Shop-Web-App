import { NextFunction, Request, Response } from 'express';
import { messageLog } from '../utils/message-handling.js';
import { AppAbility, defineAbilitiesFor } from '../utils/abilities.js';
import { User } from '../entities/User.js';
import logger from '../utils/logger.js';

export function checkAbility(action: string, subject: string | object) {
  return (req: Request, res: Response, next: NextFunction) => {
    //get user information
    const user = res.locals.user as User;
    logger.debug(`Get user information ${JSON.stringify(user)}`);

    //check user information exists
    logger.silly('Check user information exists');
    if (!user) {
      logger.debug(messageLog.userNotFound);
      res.status(401).json({ error: messageLog.userIsNotAllowedToPerformAction });
      return;
    }

    //define ability for user
    logger.silly('Define ability for user');
    const ability: AppAbility = defineAbilitiesFor(user);
    logger.debug(`Define ability for user ${JSON.stringify(user.username)}`);

    //check user's ability to perform action on subject
    logger.silly("Check user's ability to perform action on subject");
    if (ability.can(action, subject)) {
      logger.silly('user have permission');
      next();
    } else {
      logger.silly('user have no permission');
      res
        .status(403)
        .json({ error: messageLog.userIsNotAllowedToPerformAction });
      return;
    }
  };
}

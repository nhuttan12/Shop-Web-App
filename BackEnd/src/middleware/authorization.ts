import { NextFunction, Request, Response } from 'express';
import { messageLog } from '../utils/message-handling.js';
import { AppAbility, defineAbilitiesFor } from '../utils/abilities.js';
import { User } from '../entities/User.js';
import logger from '../utils/logger.js';

export function checkAbility(action: string, subject: string | object) {
  return (req: Request, res: Response, next: NextFunction) => {
    //get user information
    const user = req.user as User;
    logger.debug(`Get user information ${user}`);

    //check user information exists
    if (!user) {
      logger.debug('user not found');
      res.status(401).json({ error: messageLog.userIsnotAuthorized });
      return;
    }

    //define ability for user
    const ability: AppAbility = defineAbilitiesFor(user);
    logger.debug(`Define ability for user ${user.username}`);

    //check user's ability to perform action on subject
    if (ability.can(action, subject)) {
      logger.silly('user have permission');
      next();
    } else {
      logger.silly('user have no permission');
      return res
        .status(403)
        .json({ error: messageLog.userIsNotAllowedToPerformAction });
    }
  };
}

import bcrypt from 'bcrypt';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { env } from '../configs/env.js';
import { User } from '../entities/User.js';
import logger from './logger.js';
import { messageLog } from './message-handling.js';

//config for passport local authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username: string, password: string, done) => {
      try {
        //Find user by username with status is active
        const user: User | null = await User.findOne({
          where: {
            username,
            status: {
              name: 'Active', 
            },
          },
        });
        logger.debug(`Find user by username ${user}`);

        const userBanned: User | null = await User.findOne({
          where: {
            username,
            status: {
              name: 'Banned',
            },
          },
        });

        if (userBanned) {
          logger.info('User is banned');
          return done(null, false, { message: messageLog.userBanned });
        }

        //Check if user exists
        if (!user) {
          logger.info('User not found');
          return done(null, false, { message: messageLog.userNotExist });
        }

        //Check if user password is matches
        const isMatch = await bcrypt.compare(password, user.password);
        logger.debug(`Checking password match ${isMatch}`);

        //If password does not match, return false
        if (!isMatch) {
          logger.info('Password is incorrect');
          return done(null, false, {
            message: messageLog.invalidUsernameOrPassword,
          });
        }

        //If password matches, return user
        logger.info(`User ${user.username} logged in`);
        return done(null, user);
      } catch (error) {
        //Throw error
        logger.error('Error in login', error);
        return done(error);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
};

//config for jwt authentication
passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      //Find user
      logger.silly('Find user');
      const user: User | null = await User.findOne({
        where: { id: jwt_payload.id },
        relations: ['status', 'role'],
      });
      logger.debug(`Find user ${JSON.stringify(user)}`);

      //Checking user exist and status is active
      logger.silly('Checking user exist and status is active');
      if (user) {
        logger.silly('User is exist');

        if (user.status.name === 'banned') {
          logger.silly('User is banned');
          return done(null, false, 'Tài khoản đã bị cấm');

        } else if (user.status.name !== 'active') {
          logger.silly('User is not active');
          return done(null, false, 'Tài khoản không hợp lệ');

        } else {
          logger.silly('Returning user');
          return done(null, user);
          
        }
      } else {
        logger.silly('Returning false');
        return done(null, false);
      }
    } catch (error) {
      //Throw error
      logger.error('Error in passport', error);
      return done(error);
    }
  })
);

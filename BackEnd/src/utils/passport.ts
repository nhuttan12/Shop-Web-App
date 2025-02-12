import bcrypt from 'bcrypt';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { env } from '../configs/env.js';
import { User } from '../entities/User.js';
import logger from './logger.js';

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
              id: 1, // status active
            },
          },
        });
        logger.debug(`Find user by username ${user}`);

        const userBanned: User | null = await User.findOne({
          where: {
            username,
            status: {
              id: 4, // status banned
            },
          },
        });

        if (userBanned) {
          logger.info('User is banned');
          return done(null, false, { message: 'Tài khoản đã bị khóa' });
        }

        //Check if user exists
        if (!user) {
          logger.info('User not found');
          return done(null, false, { message: 'Tài khoản không tồn tại' });
        }

        //Check if user password is matches
        const isMatch = await bcrypt.compare(password, user.password);
        logger.debug(`Checking password match ${isMatch}`);

        //If password does not match, return false
        if (!isMatch) {
          logger.info('Password is incorrect');
          return done(null, false, { message: 'Sai tài khoản hoặc mật khẩu' });
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

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      //Find user 
      const user: User | null = await User.findOne({
        where: { id: jwt_payload.id },
      });
      logger.debug(`Find user ${user}`);

      //Checking user exist
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {

      //Throw error
      return done(error);
    }
  })
);
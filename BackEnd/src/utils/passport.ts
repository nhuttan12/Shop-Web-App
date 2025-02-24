import bcrypt from 'bcrypt';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { env } from '../configs/env.js';
import { User } from '../entities/User.js';
import logger from './logger.js';
import { messageLog } from './message-handling.js';
import { UserDTO } from '../dtos/user-dto.js';

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
          },
          relations: ['status', 'role'],
        });

        //Check if user exists
        if (!user) {
          logger.info('User not found');
          return done(null, false, { message: messageLog.userNotExist });
        }

        if (user.status.name === 'Banned') {
          logger.info('User is banned');
          return done(null, false, { message: messageLog.userBanned });
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

        //Convert to uset DTO
        const userDTO: UserDTO = await UserDTO.fromEntity(user);
        logger.debug(`Find user by username ${JSON.stringify(userDTO)}`);

        //If password matches, return user
        logger.info(`User ${userDTO.username} logged in`);
        return done(null, userDTO);
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

      //Checking user is null
      if (!user) {
        logger.info('User not found');
        return done(null, false, { message: messageLog.userNotExist });
      }

      //Convert to uset DTO
      const userDTO: UserDTO = await UserDTO.fromEntity(user);
      logger.debug(`Find user ${JSON.stringify(userDTO)}`);


      //Checking user exist and status is active
      logger.silly('Checking user exist and status is active');
      if (userDTO) {
        //Checking user status is banned
        logger.silly('Checking user status is banned');
        if (userDTO.status.name.toLowerCase() === 'banned') {
          logger.silly('User is banned');
          return done(null, false, { message: messageLog.userBanned });
        } else if (userDTO.status.name.toLocaleLowerCase() !== 'active') {
          logger.silly('User is not active');
          return done(null, false, { message: messageLog.userNotActive });
        } else {
          logger.silly('Returning user');
          return done(null, userDTO);
        }
      } else {
        logger.silly('Returning false');
        return done(null, false);
      }
    } catch (error) {
      // Ensure error is an instance of ErrorHandler
      const errorMessage =
        error instanceof Error ? error.message : 'Unknow error';
      logger.error('Error in passport', error);
      return done(error);
    }
  })
);

import { Router } from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/admin/users/user-controller.js';
import { checkAbility } from '../../middleware/authorization.js';

const router = Router();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  checkAbility('read', 'User'),
  UserController.getUsers
);

router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkAbility('read', 'User'),
  UserController.getUserById
);

router.put(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  checkAbility('update', 'User'),
  UserController.updateUser
);

export { router as manageUserRoute };


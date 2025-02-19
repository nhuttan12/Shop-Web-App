import { Request, Response, Router } from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/admin/users/user-controller.js';
import { checkAbility } from '../../middleware/authorization.js';

const router = Router();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  checkAbility('manage', 'User'),
  UserController.getUsers
);

export { router as manageUserRoute };

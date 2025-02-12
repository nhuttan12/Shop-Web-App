import { Request, Response, Router } from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/admin/users/user-controller.js';

// import from '../../controllers/admin/users/user-controller.js';

const router = Router();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  UserController.getUsers
);

export { router };

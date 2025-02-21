import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { UserController } from '../../controllers/admin/users/user-controller.js';
import { checkAbility } from '../../middleware/authorization.js';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';

const router = Router();

router.get(
  '/users',
  authenticateJwt,
  checkAbility('read', 'User'),
  UserController.getUsers
);

router.get(
  '/user/:id',
  authenticateJwt,
  checkAbility('read', 'User'),
  UserController.getUserById
);

router.put(
  '/user/:id',
  authenticateJwt,
  checkAbility('update', 'User'),
  UserController.updateUser
);

export { router as manageUserRoute };


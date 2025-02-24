import { Router } from 'express';
import { UserController } from '../../controllers/admin/user-management/user-admin-controller.js';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';
import { checkAbility } from '../../middleware/authorization.js';

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


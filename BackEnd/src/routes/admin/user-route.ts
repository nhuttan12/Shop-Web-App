import { Router } from 'express';
import { UserController } from '../../controllers/admin/user-management/user-admin-controller.js';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';
import { checkAbility } from '../../middleware/authorization.js';

const router = Router();

//get all user route
router.get(
  '/users/:page?',
  authenticateJwt,
  checkAbility('read', 'User'),
  UserController.getUsers
);

//get user by id route
router.get(
  '/user/:id/:page',
  authenticateJwt,
  checkAbility('read', 'User'),
  UserController.getUserById
);

//get user by name route
router.get(
  '/user/:name/:page',
  authenticateJwt,
  checkAbility('read', 'User'),
  UserController.getUserByName
);

//update user route
router.put(
  '/user/:id',
  authenticateJwt,
  checkAbility('update', 'User'),
  UserController.updateUser
);

//ban user route
router.post(
  '/user/:id/:page',
  authenticateJwt,
  checkAbility('delete', 'User'),
  UserController.banUser
);

export { router as manageUserRoute };


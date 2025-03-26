import { Router } from 'express';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';
import { checkAbility } from '../../middleware/authorization.js';
import { CategoryAdminController } from '../../controllers/admin/category-management/category-admin-controller.js';

const router = Router();

//get all categories and pagination
router.get(
  '/categories/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  CategoryAdminController.getCategories
);

//get category by id and pagination
router.get(
  '/category/:id/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  CategoryAdminController.getCategoryById
);

//get category by name and pagination
router.get(
  '/category/:name/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  CategoryAdminController.getCategoryByName
);

export { router as CategoryRoute };

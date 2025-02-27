import { Router } from 'express';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';
import { checkAbility } from '../../middleware/authorization.js';
import { ProductAdminController } from '../../controllers/admin/product-management/product-admin-controller.js';

const router = Router();

//get all products and pagination
router.get(
  '/products/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  ProductAdminController.getProducts
);

//get product by id and pagination
router.get(
  '/product/:id/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  ProductAdminController.getProductById
);

//get product by name and pagination
router.get(
  '/product/:name/:page',
  authenticateJwt,
  checkAbility('read', 'Product'),
  ProductAdminController.getProductByName
);

//add new product
router.post(
  '/product',
  authenticateJwt,
  checkAbility('add', 'Product'),
  ProductAdminController.AddProduct
);

//update product by id
router.put('/product/:id');

//delete product by id
router.delete(
  '/product/:id',
  authenticateJwt,
  checkAbility('read', 'Product'),
  ProductAdminController.deleteProduct
);

export { router as manageProductRoute };

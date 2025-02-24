import { Router } from 'express';
import { authenticateJwt } from '../../middleware/auth-jwt-passport.js';
import { checkAbility } from '../../middleware/authorization.js';
import { ProductAdminController } from '../../controllers/admin/product-management/product-admin-controller.js';

const router = Router();

router.get(
  '/products',
  authenticateJwt,
  checkAbility('read', 'Product'),
  ProductAdminController.getProducts
);

router.get('/product/:id');

router.post('/product');

router.put('/product/:id');

router.delete('/product/:id');

export { router as manageProductRoute };

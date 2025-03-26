import { Router } from 'express';

import { SignUpController } from '../../controllers/auth/sign-up-controller.js';
import { authenticateLocal } from '../../middleware/auth-local-passport.js';
import { refreshTokenMiddleware } from '../../middleware/refresh-token.js';
import { StoreToken } from '../../middleware/store-token.js';
import { ValidateData } from '../../middleware/validate-data.js';

const router = Router();

router.post('/sign-up', SignUpController.signUp);

router.post(
  '/sign-in',
  ValidateData,
  authenticateLocal,
  StoreToken
);

router.post(
  '/refresh-token',
  refreshTokenMiddleware,
  StoreToken
);

export { router as authRoute };


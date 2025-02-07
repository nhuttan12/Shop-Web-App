import { Router } from 'express';

import { SignUpController } from '../controllers/auth/sign-up-controller.js';
import { SignInController } from '../controllers/auth/sign-in-controller.js';

const router = Router();

router.post('/sign-up', SignUpController.signUp);

router.post('/sign-in', SignInController.signIn);

export default router;
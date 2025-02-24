import { Router } from "express";
import { checkAbility } from "../../middleware/authorization.js";

const router = Router();

router.get('/products', checkAbility('read', 'Product'));

export { router as productUserRoute }; 
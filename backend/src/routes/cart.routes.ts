import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/merge', cartController.mergeCart);
router.delete('/items/:itemId', cartController.removeItem);

export default router;

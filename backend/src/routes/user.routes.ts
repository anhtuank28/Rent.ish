import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// Toàn bộ route người dùng yêu cầu đăng nhập và có vai trò ADMIN
router.use(authenticate, authorize('ADMIN'));

router.get('/', UserController.getAll);
router.patch('/:id/role', UserController.updateRole);

export default router;

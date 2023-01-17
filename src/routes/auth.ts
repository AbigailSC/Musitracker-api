import { singUp, singIn, profile } from '../controllers/auth';
import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
const router: Router = Router();

router.post('/singup', singUp);

router.post('/singin', singIn);

router.get('/profile', TokenValidation, profile);

export default router;

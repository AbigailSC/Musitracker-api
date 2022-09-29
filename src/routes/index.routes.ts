import { Router } from 'express';

const router = Router();

router.get('/api', (_req, res) => {
  res.json({ message: 'ruta api' });
});

export default router;

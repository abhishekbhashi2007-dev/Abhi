import { Router } from 'express';
import { createGeneration, listHistory } from '../controllers/generationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.post('/', createGeneration);
router.get('/history', listHistory);

export default router;

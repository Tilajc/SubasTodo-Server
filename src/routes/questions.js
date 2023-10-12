import { Router } from 'express';
const router = Router();
import { default as QuestionsController } from '../controllers/questions';

router.put('/questions/:id', QuestionsController.updateQuestion);

export default router;
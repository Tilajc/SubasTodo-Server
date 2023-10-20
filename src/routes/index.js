import express from 'express';
import question from './questions';
const router = express.Router();
router.use('/question', question);
export default router;

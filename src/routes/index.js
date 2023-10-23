import express from 'express';
import question from './question';
const router = express.Router();
router.use('/question', question);
export default router;

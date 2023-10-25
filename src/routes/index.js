import express from 'express';

const router = express.Router();
import user from './user';
import question from './question';

router.use('/user', user);
router.use('/question', question);

export default router;

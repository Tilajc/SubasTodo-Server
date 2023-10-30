import express from 'express';
import bid from './bid';
import user from './user';
import question from './question';

const router = express.Router();

router.use('/bid', bid);
router.use('/user', user);
router.use('/question', question);

export default router;

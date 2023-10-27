import express from 'express';
import bid from './bid';
import user from './user';
const router = express.Router();

router.use('/bid', bid);
router.use('/user', user);

export default router;

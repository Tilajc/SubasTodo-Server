import express from 'express';
import bids from './bid';
import user from './user';
const router = express.Router();

router.use('/bids', bids);
router.use('/user', user);

export default router;

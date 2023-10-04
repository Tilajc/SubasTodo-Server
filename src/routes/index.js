import express from 'express';
import bids from './bid';
const router = express.Router();

router.use('/bids', bids);

export default router;

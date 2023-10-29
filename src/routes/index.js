import express from 'express';
import bid from './bid';
import user from './user';
import admin from './admin';

const router = express.Router();

router.use('/bid', bid);
router.use('/user', user);
router.use('/admin', admin);

export default router;

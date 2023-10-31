import express from 'express';
import bid from './bid';
import user from './user';
import superAdmin from './super-admin';
import question from './question';
import admin from './admin';

const router = express.Router();

router.use('/bid', bid);
router.use('/user', user);
router.use('/superadmin', superAdmin);
router.use('/question', question);
router.use('/admin', admin);

export default router;

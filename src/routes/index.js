import express from 'express';
import bid from './bid';
import user from './user';
import superAdmin from './super-admin';
const router = express.Router();

router.use('/bid', bid);
router.use('/user', user);
router.use('/superadmin', superAdmin);

export default router;

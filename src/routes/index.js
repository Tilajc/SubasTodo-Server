import express from 'express';
import user from './user';
import superAdmin from './super-admin';
const router = express.Router();

router.use('/user', user);
router.use('/superadmin', superAdmin);

export default router;

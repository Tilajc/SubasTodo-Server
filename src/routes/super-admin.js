/*import validations from '../validations/super-admin';*/
import superAdminController from '../controllers/super-admin';
import express from 'express';

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById);

export default router;

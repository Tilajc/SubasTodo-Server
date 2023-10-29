import validations from '../validations/super-admin';
import superAdminController from '../controllers/super-admin';
import express from 'express';

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById)
  .post('/', superAdminController.createSuperAdmins, validations.validateSuperCreation)
  .put('/:id', superAdminController.updateSuperAdmins, validations.validateSuperUpdate)
  .delete('/:id', superAdminController.deleteSuperAdmins);

export default router;

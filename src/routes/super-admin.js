import validations from '../validations/super-admin';
import superAdminController from '../controllers/super-admin';
import express from 'express';

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById)
  .post('/create', superAdminController.createSuperAdmins, validations.validateSuperCreation)
  .put('/update/:id', superAdminController.updateSuperAdmins, validations.validateSuperUpdate)
  .delete('/delete/:id', superAdminController.deleteSuperAdmins);

export default router;

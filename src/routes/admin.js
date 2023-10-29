import adminControllers from '../controllers/admin';
import validations from '../validations/admin';
import express from 'express';

const router = express.Router();

router
  .get('/', adminControllers.getAdmins)
  .get('/:id', adminControllers.getAdminsById)
  .post('/', validations.adminValidateCreation, adminControllers.createAdmin)
  .put('/:id', validations.adminValidateUpdate, adminControllers.updateAdmin)
  .delete('/:id', adminControllers.deleteAdmin);

export default router;

import adminControllers from '../controllers/admin';
import express from 'express';

const router = express.Router();

router
  .get('/', adminControllers.getAdmins)
  .get('/:id', adminControllers.getAdminsById)
  .post('/', adminControllers.createAdmin)
  .put('/:id', adminControllers.updateAdmin)
  .delete('/:id', adminControllers.deleteAdmin);

export default router;

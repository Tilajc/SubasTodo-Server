import validations from '../validations/user';
import userController from '../controllers/user';
import express from 'express';

const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getAllUsersById)
  .post('/', userController.createUser, validations.userValidateCreation)
  .put('/:id', userController.updateUser, validations.userValidateUpdate)
  .delete('/:id', userController.deleteUser);

export default router;

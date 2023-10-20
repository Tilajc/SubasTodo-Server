import express from 'express';
const router = express.Router();
import validations from '../validations/questions';
import { default as QuestionsController } from '../controllers/questions';

router
  .get('/', QuestionsController.getAllQuestions)
  .get('/:id', QuestionsController.getQuestionById)
  .post('/create', QuestionsController.createQuestion, validations.questionValidateCreation)
  .put('/update/:id', QuestionsController.updateQuestion /*validations.ValidateUpdate*/)
  .delete('/delete/:id', QuestionsController.deleteQuestion);

export default router;

import express from 'express';
import validations from '../validations/question';
import questionsController from '../controllers/question';
const router = express.Router();

router
  .get('/', questionsController.getAllQuestions)
  .get('/:id', questionsController.getQuestionById)
  .post('/', validations.validateQuestion, questionsController.createQuestion)
  .put('/:id', validations.validateUpdateQuestion, questionsController.updateQuestion)
  .delete('/:id', questionsController.deleteQuestion);

export default router;

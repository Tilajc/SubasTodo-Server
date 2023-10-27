import express from 'express';
const router = express.Router();
import validations from '../validations/question';
import questionsController from '../controllers/question';

router
  .get('/', questionsController.getAllQuestions)
  .get('/:id', questionsController.getQuestionById)
  .post('/', validations.validateQuestion, questionsController.createQuestion)
  .put('/:id', validations.validateupdateQuestion, questionsController.updateQuestion)
  .delete('/:id', questionsController.deleteQuestion);

export default router;

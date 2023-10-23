import express from 'express';
const router = express.Router();
//import validations from '../validations/question';
import { default as QuestionsController } from '../controllers/question';

router
  .get('/', QuestionsController.getAllQuestions)
  .get('/:id', QuestionsController.getQuestionById)
  .post('/', /* validations.createQuestion, */ QuestionsController.createQuestion)
  .put('/update/:id', QuestionsController.updateQuestion /*validations.ValidateUpdate*/)
  .delete('/delete/:id', QuestionsController.deleteQuestion);

export default router;

import express from 'express';
import bidController from '../controllers/bid';
import bidValidation from '../validations/bid';

const router = express.Router();

router
  .get('/', bidController.getAllBids)
  .get('/:id', bidController.getBidById)
  .post('/', bidValidation.bidValidateCreation, bidController.createBid)
  .put('/product/:id', bidValidation.bidValidateUpdate, bidController.updateBid)
  .put('/winner/:id', bidController.updateBidWinner)
  .put('/status/', bidController.updateBidStatus)
  .put('/question/:id', bidController.updateQuestions)
  .delete('/:id', bidController.deleteBid);

export default router;

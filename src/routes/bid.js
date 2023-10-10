import express from 'express';
import bidController from '../controllers/bid';
const router = express.Router();

router
  .get('/', bidController.getAllBids)
  .get('/:id', bidController.getBidById)
  .post('/', bidController.createBid)
  .put('/winner/:id', bidController.updateBidWinner)
  .put('/status/:id', bidController.updateBidStatus)
  .delete('/:id', bidController.deleteBid);

export default router;

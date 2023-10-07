import express from 'express';
import bidController from '../controllers/bid';
const router = express.Router();

router
  .get('/', bidController.getAllBids)
  .get('/:id', bidController.getBidById)
  .post('/', bidController.createBid);

export default router;

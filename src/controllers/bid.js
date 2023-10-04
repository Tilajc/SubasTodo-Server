import mongoose from 'mongoose';
import Bid from '../models/Bid';

const getAllBids = async (req, res) => {
  try {
    const bidsFound = await Bid.find();

    return res.status(200).json({
      message: 'Bids List',
      data: bidsFound,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `an error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const getBidById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true
    });
  }
  try {
    Bid.find();
  } catch (error) {
    return res.status(500).json({
      message: `an error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const bidController = {
  getAllBids,
  getBidById
};

export default bidController;

import mongoose from 'mongoose';
import { addDays, isBefore } from 'date-fns';
import Bid from '../models/Bid';
import User from '../models/User';

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
      message: `An error ocurred: ${error}`,
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
  const findedBid = await Bid.findById(id);
  try {
    if (!findedBid) {
      return res.status(400).json({
        message: `The bid with the ID: ${id} was not found`,
        data: undefined,
        error: true
      });
    }

    return res.status(200).json({
      message: 'Bid found!',
      data: findedBid,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const createBid = async (req, res) => {
  const { bidOwner, product, timeLimit, price } = req.body;

  if (!mongoose.isValidObjectId(bidOwner)) {
    return res.status(400).json({
      message: 'invalid bidOwner ID',
      data: undefined,
      error: true
    });
  }

  try {
    const validBidOwner = await User.findById(bidOwner);

    if (!validBidOwner) {
      return res.status(400).json({
        message: 'Cannot find the owner user',
        data: undefined,
        error: true
      });
    }

    if (timeLimit < 2 || timeLimit > 30) {
      return res.status(400).json({
        message: 'The time limit of a bid must be between two days and thirty days',
        data: undefined,
        error: true
      });
    }

    const startDate = new Date();
    const expirationDate = addDays(startDate, timeLimit);

    const newBid = await Bid.create({
      bidOwner,
      product,
      timeLimit,
      price,
      startDate,
      expirationDate
    });

    return res.status(201).json({
      message: 'Bid created successfully!',
      data: newBid,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const updateBidWinner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'invalid ID',
      data: undefined,
      error: true
    });
  }

  const { bidWinner, price } = req.body;

  if (!mongoose.isValidObjectId(bidWinner)) {
    return res.status(400).json({
      message: 'Invalid bidWinner ID',
      data: undefined,
      error: true
    });
  }

  try {
    const actualBid = await Bid.findById(id);

    if (!actualBid) {
      return res.status(404).json({
        message: `The bid with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true
      });
    }

    const validWinner = await User.findById(bidWinner);

    if (!validWinner) {
      return res.status(404).json({
        message: `The bidWinner with the ID: ${bidWinner} doesn't exists`,
        data: undefined,
        error: true
      });
    }

    if (bidWinner == actualBid.bidOwner) {
      return res.status(400).json({
        message: `You cannot bid in your own bid!`,
        data: undefined,
        error: true
      });
    }

    if (actualBid.bidWinner == bidWinner) {
      return res.status(400).json({
        message: 'You cannot bid two times in arrow!',
        data: undefined,
        error: false
      });
    }

    if (actualBid.price >= price) {
      return res.status(400).json({
        message: 'You cannot bid equal or less than the actual price!',
        data: undefined,
        error: true
      });
    }

    const updatedBid = await Bid.findByIdAndUpdate(
      id,
      {
        bidWinner,
        price
      },
      { new: true }
    );

    return res.status(200).json({
      message: 'Bid updated successfully',
      data: updatedBid,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const updateBidStatus = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true
    });
  }
  try {
    const actualBid = await Bid.findById(id);

    if (!actualBid) {
      return res.status(404).json({
        message: "Couldn't find the bid ID",
        data: undefined,
        error: true
      });
    }

    const today = new Date();

    if (isBefore(today, actualBid.expirationDate)) {
      return res.status(200).json({
        message: 'Bid still open',
        data: actualBid,
        error: false
      });
    }

    const updatedBid = await Bid.findByIdAndUpdate(
      id,
      {
        finished: true
      },
      { new: true }
    );

    return res.status(200).json({
      message: 'Bid closed',
      data: updatedBid,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const deleteBid = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true
    });
  }

  try {
    const actualBid = await Bid.findById(id);

    if (!actualBid) {
      return res.status(400).json({
        message: `The bid with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true
      });
    }

    const deletedBid = await Bid.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Bid deleted successfully!',
      data: deletedBid,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const bidController = {
  getAllBids,
  getBidById,
  createBid,
  updateBidWinner,
  updateBidStatus,
  deleteBid
};

export default bidController;

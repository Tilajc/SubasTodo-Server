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
  const { bidOwner, product, bidWinner, price, finished, questions } = req.body;

  try {
    const newBid = await Bid.create({
      bidOwner,
      product,
      bidWinner,
      price,
      finished,
      questions
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

const updateBid = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'invalid ID',
      data: undefined,
      error: true
    });
  }

  const { bidWinner, price, finished, questions } = req.body;

  try {
    const actualBid = await Bid.findById(id);

    if (!actualBid) {
      return res.status(404).json({
        message: `The bid with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true
      });
    }

    const bidProperties = Object.keys(actualBid.toObject()).slice(1, -1);
    let changes = false;
    bidProperties.forEach((property) => {
      if (
        req.body[property] &&
        req.body[property].toString().toLowerCase() !== actualBid[property].toString()
      ) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: undefined,
        error: true
      });
    }

    // add "you can't bid two times in arrow!"

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
        price,
        finished,
        questions
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
  updateBid,
  deleteBid
};

export default bidController;

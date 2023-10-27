import Questions from '../models/Question';
import User from '../models/User';
//import Bid from '../models/Bid';

import mongoose from 'mongoose';
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find().populate('user', {
      firstName: 1,
      lastName: 1,
      profilePhoto: 1
    });
    return res.status(200).json({
      message: 'List Question',
      data: questions,
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

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const idQuestion = await Questions.findOne({ $and: [{ _id: id }] }).populate('user', {
      firstName: 1,
      lastName: 1,
      profilePhoto: 1
    });
    if (!idQuestion) {
      return res.status(404).json({
        message: `Question with ID ${id} was not found`,
        data: undefined,
        error: true
      });
    }
    return res.status(200).json({
      message: `Question with ID ${idQuestion.id} was found!`,
      data: idQuestion,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true
    });
  }
};

const createQuestion = async (req, res) => {
  const { user, comment, bid } = req.body;
  const newComment = comment.trim();
  const newBid = bid.trim();
  const newUser = user.trim();
  try {
    const UsersExist = await User.findById(user);
    if (!UsersExist) {
      return res.status(404).json({
        message: 'There is no user with that ID',
        data: undefined,
        error: true
      });
    }
    const newQuestion = await Questions.create({
      comment: newComment,
      bid: newBid,
      user: newUser
    });
    return res.status(201).json({
      message: `Question with ID ${newQuestion.id} created!`,
      data: newQuestion,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true
    });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { comment, bid, user } = req.body;

  const newComment = comment.trim();
  const newBid = bid.trim();
  const newUser = user.trim();
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  }
  try {
    const currentQuestion = await Questions.findById(id);
    if (!currentQuestion) {
      return res.status(404).json({
        message: `Question with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }
    const questionProps = Object.keys(currentQuestion.toObject()).slice(1, -1);
    let changes = false;
    questionProps.forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== currentQuestion[prop].toString()) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: currentQuestion,
        error: true
      });
    }

    const updateNewQuestion = await Questions.findByIdAndUpdate(
      id,
      {
        comment: newComment,
        user: newUser,
        bid: newBid
      },
      { new: true }
    );

    return res.status(200).json({
      message: `Questions was updated successfully!`,
      data: updateNewQuestion,
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

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true
    });
  }

  try {
    const actualQuestion = await Questions.findById(id);

    if (!actualQuestion) {
      return res.status(400).json({
        message: `The question with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true
      });
    }

    const deletedQuestion = await Questions.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Question deleted successfully!',
      data: deletedQuestion,
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

const QuestionsController = {
  updateQuestion,
  getQuestionById,
  deleteQuestion,
  createQuestion,
  getAllQuestions
};

export default QuestionsController;

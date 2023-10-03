import mongoose from 'mongoose';
import User from '../models/User';

const getAllUsers = async (req, res) => {
  try {
    const findUsers = await User.find();
    return res.status(200).json({
      message: 'List of users',
      data: findUsers,
      error: false
    });
  } catch {
    return res.status(500).json({
      message: 'An Error ocurred',
      data: undefined,
      error: true
    });
  }
};

export const userController = () => ({
  getAllUsers
});

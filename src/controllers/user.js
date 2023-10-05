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

const getAllUsersById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  }

  try {
    const findUsersById = await User.findById(id);
    if (findUsersById) {
      return res.status(200).json({
        message: `User ${findUsersById.firstName} ${findUsersById.lastName} was succesfully found`,
        data: findUsersById,
        error: false
      });
    }
    return res.status(404).json({
      message: `User with id: ${id} was not found`,
      data: undefined,
      error: true
    });
  } catch {
    return res.status(500).json({
      message: 'An Error ocurred',
      data: undefined,
      error: true
    });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, dni, email, city, profilePhoto, phone, birthDate, password } =
    req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: `A user with ${emailExists.email} already exists`,
        data: undefined,
        error: true
      });
    }
    const newUser = await User.create({
      profilePhoto,
      firstName,
      lastName,
      dni,
      phone,
      birthDate,
      email,
      city,
      password
    });

    return res.status(201).json({
      message: `${firstName} ${lastName} was succesfully created`,
      data: newUser,
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, dni, email, city, profilePhoto, phone, birthDate, password } =
    req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  }
  try {
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return res.status(404).json({
        message: `User with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }
    const userProps = Object.keys(currentUser.toObject()).slice(1, -1);
    let changes = false;
    userProps.forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== currentUser[prop].toString()) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: currentUser,
        error: true
      });
    }

    const userWithExistentEmail = await User.findOne({
      $and: [
        {
          $or: [{ email }]
        },
        {
          _id: { $ne: id }
        }
      ]
    });

    if (userWithExistentEmail) {
      return res.status(400).json({
        message: 'There is another user with that email.',
        data: undefined,
        error: true
      });
    }

    const updateNewUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        email,
        city,
        profilePhoto,
        phone,
        birthDate,
        password
      },
      { new: true }
    );

    return res.status(200).json({
      message: `User ${updateNewUser.firstName} ${updateNewUser.lastName} was updated successfully!`,
      data: updateNewUser,
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  }

  try {
    const findUsersById = await User.findByIdAndDelete(id);
    if (findUsersById) {
      return res.status(200).json({
        message: `User ${findUsersById.firstName} ${findUsersById.lastName} was succesfully deleted`,
        data: findUsersById,
        error: false
      });
    }
    return res.status(404).json({
      message: `User with id: ${id} was not found`,
      data: undefined,
      error: true
    });
  } catch {
    return res.status(500).json({
      message: 'An Error ocurred',
      data: undefined,
      error: true
    });
  }
};

const userController = {
  getAllUsers,
  getAllUsersById,
  createUser,
  updateUser,
  deleteUser
};

export default userController;

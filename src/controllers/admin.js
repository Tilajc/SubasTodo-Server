import mongoose from 'mongoose';
import Admin from '../models/Admin';

const getAdmins = async (req, res) => {
  const findAdmins = await Admin.find();

  try {
    return res.status(200).json({
      messages: 'List of admins',
      data: findAdmins,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      messages: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const getAdminsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      messages: 'ID invalid',
      data: undefined,
      error: true
    });
  }

  try {
    const findAdminsById = await Admin.findById(id);
    if (!findAdminsById) {
      return res.status(404).json({
        messages: `Admin with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }
    return res.status(200).json({
      messages: `Admin ${findAdminsById.firstName} ${findAdminsById.lastName} was succesfully found`,
      data: findAdminsById,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      messages: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const createAdmin = async (req, res) => {
  const { firstName, lastName, phone, profilePhoto, email, password, dni } = req.body;
  const tFirstName = firstName.trim();
  const tLastName = lastName.trim();
  const tEmail = email.trim();
  const tPassword = password.trim();

  try {
    const findEmail = await Admin.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        messages: `A user with ${email} already exists`,
        data: undefined,
        error: true
      });
    }

    const newAdmin = await Admin.create({
      profilePhoto,
      firstName: tFirstName,
      lastName: tLastName,
      dni,
      phone,
      email: tEmail,
      password: tPassword
    });

    return res.status(201).json({
      messages: `Admin ${tFirstName} ${tLastName} was succesfully created`,
      data: newAdmin,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      messages: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, profilePhoto, email, password, dni } = req.body;
  const tFirstName = firstName.trim();
  const tLastName = lastName.trim();
  const tEmail = email.trim();
  const tPassword = password.trim();

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      messages: 'ID invalid',
      data: undefined,
      error: true
    });
  }

  try {
    const currentAdmin = await Admin.findById(id);
    if (!currentAdmin) {
      return res.status(404).json({
        messages: `Admin with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }

    const userProps = Object.keys(currentAdmin.toObject()).slice(1, -1);
    let changes = false;
    userProps.forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== currentAdmin[prop].toString()) {
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

    const adminWithExistentEmail = await Admin.findOne({
      $and: [
        {
          $or: [{ email }]
        },
        {
          _id: { $ne: id }
        }
      ]
    });

    if (adminWithExistentEmail) {
      return res.status(400).json({
        message: 'There is another admin with that email.',
        data: undefined,
        error: true
      });
    }

    const updateNewAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        profilePhoto,
        firstName: tFirstName,
        lastName: tLastName,
        dni,
        phone,
        email: tEmail,
        password: tPassword
      },
      { new: true }
    );

    return res.status(200).json({
      message: `Admin ${tFirstName} ${tLastName} was updated successfully!`,
      data: updateNewAdmin,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      messages: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      messages: 'ID invalid',
      data: undefined,
      error: true
    });
  }
  try {
    const deleteAdmin = await Admin.findByIdAndDelete(id);
    if (deleteAdmin) {
      return res.status(200).json({
        message: `Admin ${deleteAdmin.firstName} ${deleteAdmin.lastName} was succesfully deleted`,
        data: deleteAdmin,
        error: false
      });
    }
    return res.status(404).json({
      message: `Admin with id: ${id} was not found`,
      data: undefined,
      error: true
    });
  } catch (error) {
    return res.status(500).json({
      messages: `An error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};
const adminControllers = {
  getAdmins,
  getAdminsById,
  createAdmin,
  updateAdmin,
  deleteAdmin
};

export default adminControllers;

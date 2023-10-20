import mongoose from 'mongoose';
import SuperAdmin from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const findsuperAdmins = await SuperAdmin.find();
    return res.status(200).json({
      message: 'List of super admins',
      data: findsuperAdmins,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: `An Error ocurred: ${error}`,
      data: undefined,
      error: true
    });
  }
};
const getSuperAdminsById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  } else {
    try {
      const findByIdSuperAdmin = await SuperAdmin.findById(id, 'email');
      if (!findByIdSuperAdmin) {
        return res.status(404).json({
          message: `Super-admins with id: ${id} was not found`,
          data: undefined,
          error: true
        });
      }
      return res.status(200).json({
        message: `Super-Admin with id: ${id} was succesfully found`,
        data: findByIdSuperAdmin,
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `An Error ocurred: ${error}`,
        data: undefined,
        error: true
      });
    }
  }
};
const createSuperAdmins = async (req, res) => {
  const { email, password } = req.body;
  const tEmail = email.trim();
  const tPassword = password.trim();

  try {
    const emailExists = await SuperAdmin.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: `Super admin with ${email} already exists`,
        data: undefined,
        error: true
      });
    }
    const newSuperAdmin = await SuperAdmin.create({
      email: tEmail,
      password: tPassword
    });

    return res.status(201).json({
      message: 'Super admin was succesfully created',
      data: newSuperAdmin,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: 'An Error ocurred',
      error
    });
  }
};

const updateSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const tPassword = password.trim();

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'ID invalid',
        data: undefined,
        error: true
      });
    }

    const currentSuperAdmin = await SuperAdmin.findById(id);
    if (!currentSuperAdmin) {
      return res.status(404).json({
        message: `Super admin with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }

    const superAdminProps = Object.keys(currentSuperAdmin.toObject()).slice(1);
    let changes = false;
    superAdminProps.forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== currentSuperAdmin[prop].toString()) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: currentSuperAdmin,
        error: true
      });
    }

    const superAdminWithExistentEmail = await SuperAdmin.findOne({
      $and: [
        {
          $or: [{ email }]
        },
        {
          _id: { $ne: id }
        }
      ]
    });

    if (superAdminWithExistentEmail) {
      return res.status(400).json({
        message: 'There is another super admin with that email.',
        data: undefined,
        error: true
      });
    }

    const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(
      id,
      {
        password: tPassword
      },
      { new: true }
    );

    return res.status(200).json({
      message: `Super admin ${updatedSuperAdmin.email} was updated successfully!`,
      data: updatedSuperAdmin,
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

const deleteSuperAdmins = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID invalid',
      data: undefined,
      error: true
    });
  }
  try {
    const findSuperAdminById = await SuperAdmin.findByIdAndDelete(id);

    if (!findSuperAdminById) {
      return res.status(404).json({
        message: `Super admin with id: ${id} was not found`,
        data: undefined,
        error: true
      });
    }

    return res.status(200).json({
      message: `Super admin with id: ${id} was successfully deleted`
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      data: undefined,
      error
    });
  }
};
const superAdminController = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmins,
  updateSuperAdmins,
  deleteSuperAdmins
};

export default superAdminController;

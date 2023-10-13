import mongoose from 'mongoose';
import SuperAdmin from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const findsuperAdmins = await SuperAdmin.find();
    return res.status(200).json({
      message: 'List of users',
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

const superAdminController = {
  getAllSuperAdmins,
  getSuperAdminsById
};

export default superAdminController;

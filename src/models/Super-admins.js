import mongoose, { Schema } from 'mongoose';

const superAdminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('SuperAdmin', superAdminSchema);

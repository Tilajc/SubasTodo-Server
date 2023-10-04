import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  profilePhoto: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', userSchema);

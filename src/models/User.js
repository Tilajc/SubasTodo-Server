import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  profilePhoto: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  birthDate: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

export default mongoose.model('User', userSchema);

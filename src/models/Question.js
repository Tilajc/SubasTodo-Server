import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  bid: {
    type: Schema.Types.ObjectId,
    ref: 'Bid',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Question', questionSchema);

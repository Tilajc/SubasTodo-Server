import mongoose, { Schema } from 'mongoose';

const bidSchema = new Schema({
  bidOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  product: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true }
  },
  timeLimit: { type: Number, required: true },
  bidWinner: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true },
  startDate: { type: Date },
  expirationDate: { type: Date },
  finished: { type: Boolean, default: false },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export default mongoose.model('Bid', bidSchema);

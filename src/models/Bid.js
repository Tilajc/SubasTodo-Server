import mongoose, { Schema } from 'mongoose';

const bidSchema = new Schema({
  bidOwner: { type: String, required: true }, // {type: Schema.Types.ObjectId, ref: User}
  product: { type: String, required: true }, // {type: Schema.Types.ObjectId, ref: Product}
  bidWinner: { type: String, default: 'Anyone' }, // {type: Schema.Types.ObjectId, ref: User}
  bestOffer: { type: Number, required: true },
  finished: { type: Boolean, default: false },
  questions: { type: [String] }
});

export default mongoose.model('Bid', bidSchema);

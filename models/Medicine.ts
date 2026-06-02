import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  clientEmail: { type: String, required: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
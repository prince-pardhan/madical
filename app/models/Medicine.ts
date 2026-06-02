import mongoose, { Schema } from "mongoose";

const medicineSchema = new Schema(
  {
    clientEmail: {
      type: String,
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Medicine ||
  mongoose.model("Medicine", medicineSchema);
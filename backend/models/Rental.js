import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    sareeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Saree",
      required: true,
    },
    sareeName: { type: String, required: true },
    sareeImage: { type: String, required: true },
    rentalPrice: { type: Number, required: true },
    rentalDays: { type: Number, required: true, default: 3 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rental", rentalSchema);



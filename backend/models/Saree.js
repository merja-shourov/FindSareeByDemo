import mongoose from "mongoose";

const sareeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    occasion: {
      type: String,
      required: true,
      enum: ["Wedding", "Party", "Festival", "Casual", "Traditional"],
    },
    size: {
      type: String,
      default: "Free Size",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Saree", sareeSchema);


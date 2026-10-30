import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    registration: { type: String, required: true, unique: true, trim: true },
    seatNumbers:  { type: [Number], required: true },
    isArchived:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Coach", coachSchema);

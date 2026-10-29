import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: { type: String, required: true, unique: true, trim: true },
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    departureId: { type: mongoose.Schema.Types.ObjectId, ref: "Departure", required: true },
    seatNumber:  { type: Number, required: true, min: 1 },
    status:      { type: String, enum: ["PENDING", "CONFIRMED", "CANCELLED"], default: "PENDING" },
    dateValidation: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

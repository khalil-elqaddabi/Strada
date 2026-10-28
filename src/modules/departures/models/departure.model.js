import mongoose from "mongoose";

const departureSchema = new mongoose.Schema(
  {
    lineId:      { type: mongoose.Schema.Types.ObjectId, ref: "Line", required: true },
    coachId:     { type: mongoose.Schema.Types.ObjectId, ref: "Coach", required: true },
    departureAt: { type: Date, required: true },
    arrivalAt:   {
      type: Date,
      required: true,
      validate: {
        validator: function (value) { return value > this.departureAt; },
        message: "arrivalAt must be after departureAt",
      },
    },
    fareCents:   { type: Number, required: true, min: 0 },
    status:      { type: String, enum: ["OPEN", "BOARDING", "DEPARTED", "CANCELLED"], default: "OPEN" },
    revision:    { type: Number, default: 0 },
    snapshot:    { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("Departure", departureSchema);

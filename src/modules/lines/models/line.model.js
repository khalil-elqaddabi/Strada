import mongoose from "mongoose";

const lineSchema = new mongoose.Schema(
  {
    code:       { type: String, required: true, unique: true, trim: true },
    label:      { type: String, required: true, trim: true },
    stops:      [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Line", lineSchema);

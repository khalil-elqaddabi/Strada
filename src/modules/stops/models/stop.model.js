import mongoose from "mongoose";

const stopSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true, trim: true },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Stop", stopSchema);


const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stop", stopSchema);

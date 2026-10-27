
const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    numberOfSeat: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "numberOfSeat must be an integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coach", coachSchema);

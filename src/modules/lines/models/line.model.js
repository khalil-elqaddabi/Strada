
const mongoose = require("mongoose");

const lineSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    stops: [
      {
        stopId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stop",
          required: true,
        },

        stopOrder: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Line", lineSchema);

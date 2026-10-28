
import mongoose from 'mongoose';

const departureSchema = new mongoose.Schema(
  {
    lineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Line",
      required: true,
    },

    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },

    cityDepart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    cityArrival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    dateDepart: {
      type: Date,
      required: true,
    },

    departAt: {
      type: Date,
      required: true,
    },

    arriveAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.departAt;
        },
        message: "arriveAt must be after departAt",
      },
    },

    status: {
      type: String,
      enum: [
        "SCHEDULED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "SCHEDULED",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Departure", departureSchema);

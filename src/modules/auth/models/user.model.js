const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, select: false },
    role:      { type: String, enum: ["admin", "passenger", "agent"], default: "passenger" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);

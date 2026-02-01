const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // 24 hours in seconds
    },
  },
  {
    timestamps: false,
  },
);

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

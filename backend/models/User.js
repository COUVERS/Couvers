const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    }, 
    resetPasswordExpires: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
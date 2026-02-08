import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  ipAddress: {
    type: String 
  },
  userAgent: {
    type: String 
  }
}, {
  timestamps: { createdAt: true, updatedAt: false } 
});


const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;

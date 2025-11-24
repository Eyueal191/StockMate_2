import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyEmailOTP: { type: Number },
    verifyEmailOTPExpiryDate: { type: Date },
    verified: { type: Boolean, default: false },
    forgotPasswordOTP: { type: Number },
    forgotPasswordOTPExpiryDate: { type: Date },
    role: { type: String, enum: ["Staff", "Admin"], default: "Staff"},
    staff: { type: Boolean },
    adminRoleGranted: { type: Boolean, default: false },
    phone: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

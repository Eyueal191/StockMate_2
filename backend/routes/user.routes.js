import express from "express";
import {
  signUp,
  logIn,
  verifyEmailOtp,
  resendEmailOtp,
  forgotPasswordOtp,
  verifyPasswordOtp,
  passwordReset,
  logOut,
  getUsersList,
  updateUser,
  changePassword,
  getUserById,
  grantAdminRole,
  denyAdminRole
} from "../controllers/user.controllers.js";

import { authenticateUser, authorizeAdmin } from "../middlewares/auth.js";
import { sanitizeUser } from "../middlewares/sanitizers/sanitizeUser.js";
import { validateUser } from "../middlewares/validators/validateUser.js";

const userRoutes = express.Router();

/** -------------------- AUTHENTICATION ROUTES -------------------- **/
userRoutes.post("/register", sanitizeUser, validateUser, signUp); // Register (Sign Up)
userRoutes.post("/login", logIn);                                   // Login
userRoutes.get("/logout", authenticateUser, logOut);                // Logout

/** -------------------- EMAIL OTP ROUTES -------------------- **/
userRoutes.post("/verify-email-otp", verifyEmailOtp);               // Verify Email OTP
userRoutes.post("/resend-email-otp", resendEmailOtp);               // Resend Email OTP

/** -------------------- PASSWORD MANAGEMENT -------------------- **/
userRoutes.post("/forgot-password-otp", forgotPasswordOtp);         // Forgot Password OTP
userRoutes.post("/verify-password-otp", verifyPasswordOtp);         // Verify Password OTP
userRoutes.put("/password-reset", passwordReset);                   // Reset Password

/** -------------------- USER MANAGEMENT -------------------- **/
userRoutes.put("/update-user", authenticateUser, updateUser);       // Update own profile
userRoutes.put(
  "/change-password",
  authenticateUser,
  authorizeAdmin,
  changePassword
);                                                                   // Admin changes password

/** -------------------- USER DATA ROUTES -------------------- **/
userRoutes.get("/", authenticateUser, authorizeAdmin, getUsersList); // List all users (Admin)
userRoutes.get("/me", authenticateUser, getUserById);                // Get current user info

/** -------------------- ADMIN ROLE MANAGEMENT -------------------- **/
userRoutes.put(
  "/grant-admin/:id",
  authenticateUser,
  authorizeAdmin,
  grantAdminRole
);                                                                   // Grant admin role to user
userRoutes.put(
  "/deny-admin/:id",
  authenticateUser,
  authorizeAdmin,
  denyAdminRole
);                                                                   // Deny admin role from user

export default userRoutes;

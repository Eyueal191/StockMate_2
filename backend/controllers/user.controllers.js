import sendEmail from "../config/resend.js";
import User from "../models/user.js";
import generateAccessToken from "../utility/generateAccessToken.js";
import verifyAccessToken from "../utility/verifyAccessToken.js";
import  hashPassword from "../utility/hashPassword.js"
import otpTemplate from "../utility/otpTemplate.js";
import comparePassword from "../utility/comparePassword.js";
// ====================
// User Controller
// ====================
// 1. Sign Up
const signUp = async (req, res, next) => {
  try {
    const {name, email, password}=req.body;
    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(400).json({message:"User with this email already exist", error:true, success:false})
    }
    let hashedPassword = await hashPassword(password);
    const verifyEmailOTP = Math.floor(1000 + Math.random() * 9000);

    let user = await User.create({name, email, password:hashedPassword, verifyEmailOTP})
    user.verifyEmailOTPExpiryDate=new Date(new Date() + 15*60*1000) // after 15 minutes
    await user.save();
    let html = otpTemplate(verifyEmailOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
    to: email,
    subject:"Verify your Email",
    html
});
    return res.status(201).json({ message: "You've registered successfully. Please check your email to verify", error:false, success:true});
  } catch (err) {
    next(err);
  }
};
// 3. Verify Email OTP
const verifyEmailOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const now = new Date();
    // Validate OTP and expiry
    if (
      user.verifyEmailOTP !== Number(otp) ||
      user.verifyEmailOTPExpiryDate < now
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        success: false,
        error: true,
      });
    }

    // Mark user as verified
    user.verified = true;
    user.verifyEmailOTP = null;
    user.verifyEmailOTPExpiryDate = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });

  } catch (err) {
    next(err);
  }
};
// 2. resendEmailOTP
const resendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email doesn't exist",
        error: true,
        success: false,
      });
    }
    // Generate new OTP and expiry
    const verifyEmailOTP = Math.floor(1000 + Math.random() * 9000);
    user.verifyEmailOTP = verifyEmailOTP;
    user.verifyEmailOTPExpiryDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();
    // Send OTP email
    const html = otpTemplate(verifyEmailOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
      to: email,
      subject: "Verify your Email",
      html,
    });

    return res.status(201).json({
      message: "A new OTP has been sent to your email. Please check your email to verify.",
      error: false,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
// 3. Log In
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Unregistered email",
        success: false,
        error: true,
      });
    }

    // 2. Check password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect credentials",
        success: false,
        error: true,
      });
    }

    // 3. Generate access token (short-lived)
    const accessToken = await generateAccessToken(user._id);

    // 4. Set access token in httpOnly cookie
    const cookieOptions = {
      httpOnly: true,                                   // JS cannot access
      secure: process.env.NODE_ENV === "production",   // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
      maxAge: 3 * 24 * 60 * 60 * 1000,                         // 15 minutes
      path: "/",                                       // available site-wide
    };
    res.cookie("accessToken", accessToken, cookieOptions);
    // 5. Send success response (no token in JSON, cookie already sent)
    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      error: false,
      isLoggedIn: true,
      user
    });

  } catch (err) {
    next(err);
  }
};


// 4. Forgot Password OTP
const forgotPasswordOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User with this email is not registered",
        error: true,
        success: false,
      });

    // Generate OTP
    const forgotPasswordOTP = Math.floor(1000 + Math.random() * 9000);
    user.forgotPasswordOTP = forgotPasswordOTP;

    // Correct expiry date (15 minutes from now)
    const forgotPasswordOTPExpiryDate = new Date(Date.now() + 15 * 60 * 1000);
    user.forgotPasswordOTPExpiryDate = forgotPasswordOTPExpiryDate;

    // Save user
    await user.save();

    // Send OTP email
    const html = otpTemplate(forgotPasswordOTP, `${process.env.FRONT_END_URL}/register`);
    await sendEmail({
      to: email,
      subject: "Reset your Password OTP",
      html,
    });

    return res.status(201).json({
      message: "A new OTP has been sent to your email. Please check your email to verify.",
      error: false,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
// 5. Verify Password OTP
const verifyPasswordOtp = async (req, res, next) => {
  try {
   const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const now = new Date();
    // Validate OTP and expiry
    if (
      user.forgotPasswordOTP!== Number(otp) ||
      user.forgotPasswordOTPExpiryDate < now
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
        success: false,
        error: true,
      });
    }
    // Mark user as verified
    user.forgotPasswordOTP = null;
    user.forgotPasswordOTPExpiryDate = null;
    await user.save();
    return res.status(200).json({
      message: "Verified successfully, you can now reset your password",
      success: true,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
// 7. Password Reset
const passwordReset = async (req, res, next) => {
  try {
    const {email, password} =req.body
       const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    let hashedPassword = await hashPassword(password);
    user.password=hashedPassword;
    await user.save();
     await user.save();

    return res.status(200).json({
      message: "Your password has been changed successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
// 8. logOut 
const logOut = async (req, res) => {
  // Clear the accessToken cookie
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expires: new Date(0), // Expire immediately
  });

  return res.status(200).json({
    message: "Logged out successfully",
    success: true,
    error: false,
  });
};
// 9. getUsersList
const getUsersList = async (req, res, next) => {
  try {
    let users = await User.find({})
    return res.status(200).json({message:"User's List has been retrieved successfully", error:false, success:true,users})
  
  } catch (error) {
    next()
  }
}
// 10. updateUser
const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // set by authenticateUser middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Unregistered user",
        success: false,
        error: true,
      });
    }

    // Only allow specific fields to be updated
    const { name, email, phone, bio } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    const updatedUser = await user.save();

    // Exclude password before sending
    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;

    return res.status(200).json({
      message: "User has been updated successfully",
      success: true,
      error: false,
      user: userToReturn,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Both current and new passwords are required",
        success: false,
        error: true,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Verify old password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
        success: false,
        error: true,
      });
    }

    // Hash new password
    user.password = await hashPassword(newPassword);

    await user.save();

    return res.status(200).json({
      message: "Password has been changed successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

const grantAdminRole = async (req, res, next) => {
  try { const {id}=req.params;
        let user = await User.findById(id)
        user.adminRoleGranted = true
        await user.save()
       return res.status(201).json({message:"AdminRole has been granted successfully", error:false, success:true})
  } catch (error) {
    next(error)
  }
}
const denyAdminRole = async (req, res, next) => {
  try {
     const {id}=req.params;
        let user = await User.findById(id)
        user.adminRoleGranted = false
        await user.save()
       return res.status(201).json({message:"AdminRole has been denied successfully", error:false, success:true})
  
  } catch (error) {
   next(error) 
  }
}
const getUserById = async (req, res, next) => {
  try {
    const id = req.user._id;
    console.log("userId", id);

    const user = await User.findById(id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: false,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User has been retrieved successfully",
      error: false,
      success: true,
      user, // ✅ send the user object
    });
  } catch (error) {
    next(error);
  }
};
export {
  getUserById,
  signUp,
  logIn,
  verifyEmailOtp,
  resendEmailOtp,
  forgotPasswordOtp,
  verifyPasswordOtp,
  passwordReset,
  logOut,
  getUsersList,updateUser,changePassword,denyAdminRole,grantAdminRole
};

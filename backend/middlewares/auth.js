import verifyAccessToken from "../utility/verifyAccessToken.js";
import User from "../models/user.js";

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
        error: true,
      });
    }

    const { valid, decoded, error } = await verifyAccessToken(accessToken);

    if (!valid) {
      if (error === "jwt expired") {
        res.cookie("accessToken", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          expires: new Date(0),
        });

        return res.status(401).json({
          message: "Access token has expired",
          success: false,
          error: true,
        });
      }

      return res.status(403).json({
        message: "Invalid token",
        success: false,
        error: true,
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    req.user = user;

    if (user.role === "Admin" || user.adminRoleGranted) {
      req.isAdmin = true;
    }

    next();
  } catch (err) {
    next(err);
  }
};

const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.isAdmin) return next();

    return res.status(403).json({
      message: "Access denied: Admins only",
      success: false,
      error: true,
    });
  } catch (err) {
    next(err);
  }
};

export { authenticateUser, authorizeAdmin };

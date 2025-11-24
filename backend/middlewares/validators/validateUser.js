// middlewares/userValidator.js
import { body, validationResult } from "express-validator";

// 2️⃣ Validator middleware for user sign-up
export const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

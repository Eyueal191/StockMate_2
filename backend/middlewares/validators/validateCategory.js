import { body, validationResult } from "express-validator";

// Validate the category name
export const validateCategory = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters long"),
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

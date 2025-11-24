import { body, validationResult } from "express-validator";

/**
 * Middleware to validate item data
 */
export const validateItem = [
  body("name")
    .notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a number >= 0"),
  body("stock")
    .notEmpty().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be an integer >= 0"),
  body("category")
    .notEmpty().withMessage("Category is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Restore original JSON string
      req.body.data = req.body._originalData;
      return res.status(400).json({
        success: false,
        error: true,
        message: "Validation failed",
        details: errors.array(),
      });
    }
    next();
  }
];

// middlewares/saleValidator.js
import { validationResult, body } from "express-validator";

// 2️⃣ Validator middleware
export const validateSale = [
  body("name").notEmpty().withMessage("Item name is required"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("seller").optional().isString().withMessage("Seller must be a string"),
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

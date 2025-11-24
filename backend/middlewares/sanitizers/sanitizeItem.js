import { body } from "express-validator";

/**
 * Middleware to parse and sanitize item data
 */
export const sanitizeItem = [
  (req, res, next) => {
    if (!req.body.data) return res.status(400).json({
      success: false,
      error: true,
      message: "Missing 'data' field",
    });

    try {
      // Backup original JSON string
      req.body._originalData = req.body.data;

      // Parse JSON to object
      req.body = { ...JSON.parse(req.body.data), ...req.body };

      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid JSON format in 'data' field",
      });
    }
  },

  // Sanitization
  body("name").trim().escape(),
  body("category").trim().escape(),
  body("description").optional().trim().escape(),

  // Restore JSON string
  (req, res, next) => {
    req.body.data = req.body._originalData;
    next();
  },
];

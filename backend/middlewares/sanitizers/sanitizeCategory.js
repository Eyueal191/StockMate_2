import { body } from "express-validator";

// Sanitize the category name: trim, escape
export const sanitizeCategory = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category name cannot be empty"),
];

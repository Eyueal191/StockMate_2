import { body, validationResult } from "express-validator";

// 1️⃣ Sanitizer middleware for user sign-up
export const sanitizeUser = [
  body("name").trim().escape(),
  body("email").normalizeEmail(),
  body("password").trim().escape(),
];

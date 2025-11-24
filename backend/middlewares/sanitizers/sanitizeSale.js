// middlewares/saleSanitizer.js
import { body } from "express-validator";

// 1️⃣ Sanitizer middleware
export const sanitizeSale = [
  body("name").trim().escape(),
  body("quantity").toInt(),
  body("seller").optional().trim().escape(),
];

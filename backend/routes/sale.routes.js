import express from "express";
import { 
  addSale, 
  getSales, 
  updateSale, 
  deleteSale, 
  getSaleById 
} from "../controllers/sale.controllers.js";

import { authenticateUser, authorizeAdmin } from "../middlewares/auth.js";
import { sanitizeSale } from "../middlewares/sanitizers/sanitizeSale.js";
import { validateSale } from "../middlewares/validators/validateSale.js";
const saleRoutes = express.Router();

/* ------------------------------
   📌 SALES ROUTES
   ------------------------------ */

// Create a new sale (authenticated staff)
saleRoutes.post(
  "/", 
  authenticateUser,          // Must be logged in
  sanitizeSale,              // Sanitize input
  validateSale,              // Validate input
  addSale
);

// Get all sales (authenticated staff)
saleRoutes.get("/", authenticateUser, getSales);

// Get single sale by ID (authenticated staff)
saleRoutes.get("/:id", authenticateUser, getSaleById);

// Update sale by ID (admin-only)
saleRoutes.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  updateSale
);

// Delete sale by ID (admin-only)
saleRoutes.delete("/:id", authenticateUser, authorizeAdmin, deleteSale);

export default saleRoutes;
